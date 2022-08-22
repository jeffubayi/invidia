import {
  Button,
  Card,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useRouter } from "next/router";
import { StoryProps,fetcher} from "../utils";
import { Formik } from "formik";
import { supabase } from "../utils/supabaseClient";
import useSWR from "swr";
import toast from "react-hot-toast";
import React from "react";

const StoryCard = (stories: StoryProps) => {
  const { label, content, id } = stories;
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  const { data, error } = useSWR(`/api/stories/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <div className="max-w-sm" onClick={() => setShowModal(true)}>
        <Card>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {label}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {content}
          </p>
        </Card>
      </div>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Formik
          initialValues={{
            label: data?.story?.label,
            content: data?.story?.content,
            id,
          }}
          validate={(values) => {}}
          onSubmit={async (values) => {
            try {
              const { label, content } = values;
              await supabase
                .from("stories")
                .update([
                  {
                    label,
                    content,
                  },
                ])
                .match({ id: id })
                .then(() => {
                  router.push(`/story`);
                  toast.success(`Story ${id} Updated`);
                });
            } catch (err) {
              console.log(err);
              toast.error(`Error ${id} Updating`);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Modal.Header>View story</Modal.Header>
              <Modal.Body>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Story Label" />
              </div>
              <TextInput
                name="label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}id="label"
                type="text"
                placeholder="label"
              />
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Story Content" />
              </div>
              <TextInput
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}id="content"
                type="text"
                placeholder="Content"
              />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Update</Button>
                <Button color="failure" onClick={() => setShowModal(false)}>
                  Delete
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default StoryCard;
