import React from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import {
  Button,
  Spinner,
  Modal,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { Formik } from "formik";
import StoryCard from "../components/story-card";
import { StoryProps, fetcher } from "../utils";
import { supabase } from "../utils/supabaseClient";

const Notes = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [notes, setNotes] = React.useState<StoryProps[]>();
  const user_id =
    typeof window !== "undefined" && sessionStorage.getItem("user_id");

  React.useEffect(() => {
    (async function getNotes() {
      let {
        data: notes,
        error,
      } = await supabase.from("stories").select("*").eq("user_id", user_id);
      if (error) toast.error("Error loading");

      if (error) return toast.error("Error fetching");
      else setNotes(notes);
    })();
  }, [notes, user_id]);
  console.log("data", notes, user_id);
  return (
    <div className="m-4">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Your notes
        </h5>
        <Button onClick={() => setShowModal(true)}>Add Note</Button>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {notes?.length > 0 ? (
          notes?.map(({ label, id, content }: StoryProps) => (
            <StoryCard key={id} id={id} label={label} content={content} />
          ))
        ) : (
          <Spinner color="info" />
        )}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Formik
          initialValues={{
            label: "",
            content: "",
            created_at: new Date(),
            user_id,
          }}
          validate={(values) => {}}
          onSubmit={async (values) => {
            try {
              await fetch("/api/stories/create", {
                method: "POST",
                body: JSON.stringify({ values }),
              }).then(() => {
                setShowModal(false);
                toast.success("Story added successfully", {
                  icon: "📒📖",
                });
              });
            } catch (err) {
              console.log(err);
              toast.error("Error creating story");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
          }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Modal.Header>Create new note</Modal.Header>
              <Modal.Body>
                <div className="mb-3 block">
                  <Label htmlFor="label" value="Note Label" />
                </div>
                <TextInput
                  id="label"
                  type="text"
                  placeholder="Add note label"
                  required={true}
                  name="label"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.label}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.label && touched.label && errors.label}
                </p>
                <div className="m-2 block">
                  <Label htmlFor="content" value="Note Content" />
                </div>
                <Textarea
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  required={true}
                  id="content"
                  placeholder="Content.."
                  rows={4}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.content && touched.content && errors.content}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" disabled={!dirty}>
                  Submit
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Notes;
