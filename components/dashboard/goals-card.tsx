import { Card, Modal, Button, Textarea, Checkbox } from "flowbite-react";
import React from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabaseClient";
import { TaskProp } from "../../utils";

const StoryCard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [tasks, setTasks] = React.useState<TaskProp[]>();

  React.useEffect(() => {
    (async function getTasks() {
      const { data } = await supabase.from("tasks").select("*").limit(10);
      setTasks(data);
    })();
  }, [tasks]);

  return (
    <div className="hidden lg:block">
      <Card>
        <h5 className=" text-xl font-medium text-gray-500 dark:text-gray-400">
          Today&apos;s Goals
        </h5>
        <ul role="list" className="my-2 space-y-5">
          {tasks ? (
            tasks?.map(({ id, task, isComplete }: TaskProp) => (
              <li className="flex space-x-3 " key={id}>
                <Formik
                  initialValues={{
                    isComplete: null,
                  }}
                  onSubmit={async (values) => {
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  {({ values }) => (
                    <Form>
                      <Field
                        component={Checkbox}
                        name="isComplete"
                        value={isComplete}
                        checked={isComplete === null ? false :isComplete }
                        onChange={async (values) => {
                          console.log(`values`, values.target.checked);
                          await supabase
                            .from("tasks")
                            .update([
                              {
                                isComplete: values.target.checked,
                                updated_at: new Date(),
                              },
                            ])
                            .match({ id: id });
                        }}
                      />
                    </Form>
                  )}
                </Formik>
                <span
                  className={`text-base font-normal leading-tight ${
                    isComplete ? "line-through" : ""
                  } text-gray-500 dark:text-gray-400`}
                >
                  {task}
                </span>
              </li>
            ))
          ) : (
            <span className="text-base font-normal leading-tight text-gray-500">
              No Tasks for today
            </span>
          )}
        </ul>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
        >
          Add task
        </button>
      </Card>
      <Modal
        show={showModal}
        position="top-right"
        onClose={() => setShowModal(false)}
        size="sm"
      >
        <Formik
          initialValues={{
            task: "",
          }}
          validate={(values) => {}}
          onSubmit={async (values) => {
            try {
              const { data, error } = await supabase
                .from("tasks")
                .insert([
                  {
                    task: values.task,
                    isComplete: false,
                    created_at: new Date(),
                  },
                ])
                .single();
              if (data) {
                setShowModal(false);
                toast.success("Task added successfully");
              }
            } catch (err) {
              console.log(err);
              toast.error("Error creating task");
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, dirty }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Modal.Header>Add a goal</Modal.Header>
              <Modal.Body>
                <Textarea
                  name="task"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={true}
                  rows={2}
                />
                <div className="flex justify-center gap-4 mt-4">
                  <Button type="submit" disabled={!dirty}>
                    Save task
                  </Button>
                </div>
              </Modal.Body>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default StoryCard;
