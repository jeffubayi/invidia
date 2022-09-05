import { Button, Card, Label, Modal, TextInput,Textarea } from "flowbite-react";
import { StoryProps } from "../utils";
import { Formik } from "formik";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import React from "react";

const StoryCard = (stories: StoryProps) => {
  const { label, content, id } = stories;
  const [showModal, setShowModal] = React.useState(false);
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
        onClose={() => setShowModal(false)}
      >
        <Formik
          initialValues={{
            label,
            content,
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
                  setShowModal(false);
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
            dirty,
          }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Modal.Header>View note : {id}</Modal.Header>
              <Modal.Body>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Note Label" />
                </div>
                <TextInput
                  name="label"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.label}
                  id="label"
                  type="text"
                  placeholder="label"
                />
                <div className="my-2 block">
                  <Label htmlFor="password1" value="Note Content" />
                </div>
                <Textarea
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  id="content"
                  placeholder="Content"
                  rows={4}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" disabled={!dirty}>
                  Update
                </Button>
                <Button
                  color="failure"
                  onClick={async () => {
                    try {
                      await supabase
                        .from("stories")
                        .delete()
                        .eq("id", id)
                        .then(() => {
                          setShowModal(false);
                          toast.success(`Note ${label} deleted`);
                        });
                    } catch (err) {
                      console.log(err);
                      toast.error(`Error deleting ${label}`);
                    }
                  }}
                >
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
