/* eslint-disable @next/next/no-img-element */
import { ProjectProp, fetcher } from "../../utils";
import { Formik } from "formik";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import React from "react";
import {
  Label,
  Textarea,
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
  Spinner,
} from "flowbite-react";
import { HiClock, HiOutlineFilter } from "react-icons/hi";
import useSWR from "swr";
import Skeleton from "../skeleton";

const ProjectTable = ({ close }: { close: any }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [projects, setProjects] = React.useState<ProjectProp[]>();
  const user_id =
    typeof window !== "undefined" && sessionStorage.getItem("user_id");

  React.useEffect(() => {
    (async function getProjects() {
      let { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user_id);
      if (error) toast.error("Error loading");
      else setProjects(projects);
    })();
  }, [projects, user_id]);
  return (
    <>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Assignee</Table.HeadCell>
          <Table.HeadCell>Project name</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y" onClick={() => setShowModal(true)}>
          {projects ? (
            projects?.map(
              ({
                title,
                id,
                description,
                created_at,
                statuses,
                assigned,
                completed,
              }: ProjectProp) => (
                <>
                  <Table.Row
                    key={id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <Avatar
                        size="sm"
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
                      <Badge color={statuses == "done" ? "success" : "info"}>
                        {statuses}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color="gray" icon={HiClock}>
                        {new Date(created_at).toLocaleDateString()}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                  {showModal && (
                    <Modal show={showModal} size="3xl" onClose={close}>
                      <Modal.Header>{`#${id} : ${title}`}</Modal.Header>
                      <Modal.Body>
                        <div className="space-y-6 p-6">
                          <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                              <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="shrink-0">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                      alt="Neil image"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                      {assigned}
                                    </p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                      email@windster.com
                                    </p>
                                  </div>
                                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Badge color="warning"> {statuses}</Badge>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className=" block">
                            <Label htmlFor="content" value="Description" />
                          </div>
                          <Textarea value={description} rows={4} />
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Checkbox id="remember" checked={completed} />
                              <Label htmlFor="remember">Completed</Label>
                            </div>
                            <Badge color="gray" icon={HiClock}>
                              {new Date(created_at).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={close}>Update project</Button>
                        <Button color="gray" onClick={close}>
                          Decline
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </>
              )
            )
          ) : (
            <Skeleton />
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default ProjectTable;
