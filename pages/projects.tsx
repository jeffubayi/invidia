/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, useReducer, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import {
  Label,
  TextInput,
  Button,
  Dropdown,
  Card,
  Tabs,
  Table,
  Checkbox,
  Badge,
  Avatar,
  Modal,
  Textarea,
  Spinner,
} from "flowbite-react";
import Link from "next/link";
import { HiClock, HiOutlineFilter } from "react-icons/hi";
import Skeleton from "../components/skeleton";
import { ProjectProp, fetcher } from "../utils";
import React from "react";
import useSWR from "swr";
import { Formik } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProjectList from "../components/projects/list";
import { useRouter } from "next/router";

const dragReducer = (state, action) => {
  return state;
};

const Projects = () => {
  const [createProjectModal, setCreateProjectModal] = React.useState(false);
  const [, setShowModal] = React.useState(false);
  const [projects, setProjects] = React.useState<ProjectProp[]>();
  const router = useRouter();
  const user_id =
    typeof window !== "undefined" && sessionStorage.getItem("user_id");
    const assigned =
    typeof window !== "undefined" && sessionStorage.getItem("loggedIn");

  useEffect(() => {
    (async function getProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user_id )
      if (error) toast.error("Error loading");
      else setProjects(projects);
    })();
  }, [projects, user_id ]);


  const onDragEnd = useCallback((result) => {
    const { destination, source, draggableId, droppableId, index, reason } =
      result;
    console.log("destination", destination, "source", source, draggableId);
    if (reason === "DROP") {
      if (!destination) {
        return;
      }
    }
  }, []);


  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Projects
        </h5>

        <Button onClick={() => setCreateProjectModal(true)}>Add Project</Button>
      </div>
      <Tabs.Group aria-label="Pills" style="underline">
        <Tabs.Item active={true} title="List">
          <ProjectList close={() => setShowModal(false)} />
        </Tabs.Item>
        <Tabs.Item title="Board">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items" type="list" direction="horizontal">
              {(provided, snapshot) => {
                return (
                  <div
                    className="p-4 dark:bg-gray-700 bg-white  rounded w-2/4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Badge color="info">TO-DO</Badge>
                    </p>
                    {projects?.length > 0 ? projects?.map(
                      ({
                        title,
                        id,
                        description,
                        created_at,
                        statuses,
                        assigned,
                      }: ProjectProp) => {
                        return (
                          <Draggable key={id} draggableId={id} index={id}>
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="flow-root">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                      <li>
                                        <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                            <img
                                              className="h-8 w-8 "
                                              src="https://flowbite.com/docs/images/blog/image-1.jpg"
                                              alt="assigned"
                                            />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                              {title}
                                            </p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                              {description}
                                            </p>
                                          </div>
                                          <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                            <Badge color="gray" icon={HiClock}>
                                              {new Date(
                                                created_at
                                              ).toLocaleDateString()}
                                            </Badge>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </Card>
                              );
                            }}
                          </Draggable>
                        );
                      }
                    ):(  <Spinner color="info" />)}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <Droppable droppableId="items" type="list">
              {(provided, snapshot) => {
                return (
                  <div
                    className="p-4 dark:bg-gray-700 bg-white  rounded w-2/4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Badge color="success">DONE</Badge>
                    </p>
                    {projects?.map(
                      ({
                        title,
                        id,
                        description,
                        created_at,
                        statuses,
                        assigned,
                      }: ProjectProp) => {
                        return (
                          <Draggable key={id} draggableId={id} index={id}>
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="flow-root">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                      <li>
                                        <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                            <img
                                              className="h-8 w-8 "
                                              src="https://flowbite.com/docs/images/blog/image-1.jpg"
                                              alt="assigned"
                                            />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                              {title}
                                            </p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                              {description}
                                            </p>
                                          </div>
                                          <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                            <Badge color="gray" icon={HiClock}>
                                              {new Date(
                                                created_at
                                              ).toLocaleDateString()}
                                            </Badge>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </Card>
                              );
                            }}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>

          <div className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
            <div className="text-left">
              <div className="mb-1 text-xs">Project 1</div>
            </div>
          </div>
        </Tabs.Item>
      </Tabs.Group>
      <Modal
        show={createProjectModal}
        onClose={() => setCreateProjectModal(false)}
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            created_at: new Date(),
            completed: false,
            assigned,
            statuses: "todo",
            user_id
          }}
          validate={(values) => {}}
          onSubmit={async (values) => {
            console.log(`values`,values);
            try {
              await fetch("/api/projects/create", {
                method: "POST",
                body: JSON.stringify({ values }),
              }).then(() => {
                setCreateProjectModal(false);
                toast.success("Project added successfully");
              });
            } catch (err) {
              console.log(err);
              toast.error("Error creating project");
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
            isSubmitting,
          }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Modal.Header>Create new project</Modal.Header>
              <Modal.Body>
                <div className="mb-3 block">
                  <Label htmlFor="label" value="Title" />
                </div>
                <TextInput
                  id="label"
                  type="text"
                  placeholder="project title"
                  required={true}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.title && touched.title && errors.title}
                </p>
                <div className="m-2 block">
                  <Label htmlFor="content" value="Description" />
                </div>
                <Textarea
                  name="description"
                  required={true}
                  id="content"
                  placeholder="description.."
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <Button
                  color="gray"
                  onClick={() => setCreateProjectModal(false)}
                >
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
export default Projects;

