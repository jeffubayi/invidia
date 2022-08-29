import {
  Card,
  Modal,
  Button,
  Textarea,
  Checkbox,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabaseClient";
import { TaskProp } from "../../utils";
import { HiXCircle, HiOutlineServer } from "react-icons/hi";

const StoryCard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [todos, setTodos] = React.useState<TaskProp[]>();
  const [newTaskText, setNewTaskText] = React.useState("");
  const [isCompleted, setIsCompleted] = React.useState(false);

  const toggle = async (id: string | number) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ isComplete: !isCompleted })
        .eq("id", id)
        .single();
      if (error) {
        toast.error("Error updating");
      }
      setIsCompleted(data.isComplete);
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    (async function getTasks() {
      let { data: todos, error } = await supabase
        .from("tasks")
        .select("*")
        .limit(10);
      if (error) toast.error("Error loading");
      else setTodos(todos);
    })();
  }, [todos]);

  const addTodo = async (taskText) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from("tasks")
        .insert({ task })
        .single();
      if (error) toast.error("Error creating");
      else setTodos([...todos, todo]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="hidden lg:block">
      <Card>
        <h5 className=" text-xl font-medium text-gray-500 dark:text-gray-400">
          Today&apos;s goals
        </h5>

        <ul role="list">
          {todos?.length > 0 ? (
            todos?.map(({ id, task, isComplete }: TaskProp) => (
              <li
                key={id}
                onClick={(e) => {
                  e.preventDefault();
                  toggle(id);
                }}
                className="py-3 sm:py-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <Checkbox
                      onChange={(e) => toggle(id)}
                      checked={isComplete}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium text-gray-900 dark:text-white ${
                        isComplete ? "line-through" : ""
                      }`}
                    >
                      {task}
                    </p>
                  </div>
                  <div className="inline-flex">
                    <HiXCircle
                      className="text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteTodo(id);
                      }}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <span className=" flex items-center justify-center text-sm font-normal leading-tight text-gray-500">
              <HiOutlineServer />
              <div className="block">No plans yet</div>
            </span>
          )}
        </ul>
        <div className="flex gap-1 my-1  ">
          <TextInput
            placeholder="Add goal... "
            sizing="md"
            value={newTaskText}
            onChange={(e) => {
              setNewTaskText(e.target.value);
            }}
          />
          <Button size="sm" onClick={() => addTodo(newTaskText)}>
            Add
          </Button>
        </div>
      </Card>
      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default StoryCard;
