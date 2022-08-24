import { useState } from "react";
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
import { HiOutlineFilter } from "react-icons/hi";
import Skeleton from "../components/skeleton";
import GridLayout from "react-grid-layout";
import { ProjectProp, fetcher } from "../utils";
import React from "react";
import useSWR from "swr";
import { Formik } from "formik";

const Projects = () => {
  const [showModal, setShowModal] = React.useState(false);
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  const { data, error } = useSWR("/api/projects", fetcher);
  if (error) return toast.error("Error fetching");
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" />
        Loading projects..
      </div>
    );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Projects
        </h5>

        <Button onClick={() => setShowModal(true)}>Add Project</Button>
      </div>
      <Tabs.Group aria-label="Pills" style="underline">
        <Tabs.Item active={true} title="List">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="!p-4">
                <Checkbox />
              </Table.HeadCell>

              <Table.HeadCell>Assigned</Table.HeadCell>
              <Table.HeadCell>Project name</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Due Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data ? (
                data.data?.map(
                  ({
                    title,
                    id,
                    description,
                    created_at,
                    statuses,
                    assigned,
                  }: ProjectProp) => (
                    <Table.Row
                      key={id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="!p-4">
                        <Checkbox />
                      </Table.Cell>

                      <Table.Cell>
                        <Avatar
                          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          rounded={true}
                        >
                          <div className="space-y-1 font-medium dark:text-white">
                         
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                            {assigned}
                            </div>
                          </div>
                        </Avatar>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {title}
                      </Table.Cell>
                      <Table.Cell>{description}</Table.Cell>
                      <Table.Cell>
                        <Badge color="info">{statuses}</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(created_at).toLocaleDateString()}
                      </Table.Cell>
                    </Table.Row>
                  )
                )
              ) : (
                <Skeleton />
              )}
            </Table.Body>
          </Table>
        </Tabs.Item>
        <Tabs.Item title="Board">
          <GridLayout
            className="layout"
            layout={layout}
            cols={3}
            rowHeight={30}
            width={1200}
          >
            <div key="a">
              {" "}
              <div className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
                <div className="text-left">
                  <div className="mb-1 text-xs">Project 1</div>
                </div>
              </div>
            </div>
            <div key="b">
              {" "}
              <div className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
                <div className="text-left">
                  <div className="mb-1 text-xs">Project 2</div>
                </div>
              </div>
            </div>
            <div key="c">
              {" "}
              <div className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
                <div className="text-left">
                  <div className="mb-1 text-xs">Project 3</div>
                </div>
              </div>
            </div>
          </GridLayout>
        </Tabs.Item>
      </Tabs.Group>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            created_at: new Date(),
            completed: false,
            assigned: "jeff ubayi",
            statuses: "created",
          }}
          validate={(values) => {}}
          onSubmit={async (values) => {
            try {
              await fetch("/api/projects/create", {
                method: "POST",
                body: JSON.stringify({ values }),
              }).then(() => {
                setShowModal(false);
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
export default Projects;

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("id");
  return {
    props: {
      data,
      error,
    },
  };
}
