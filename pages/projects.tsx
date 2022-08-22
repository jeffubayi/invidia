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
} from "flowbite-react";
import Link from "next/link";
import { HiOutlineFilter } from "react-icons/hi";
import Skeleton from "../components/skeleton";
import GridLayout from "react-grid-layout";
import { StoryProps } from "../utils";

const Projects = ({ data, error }: { data: StoryProps[]; error: any }) => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Projects
        </h5>

        <Dropdown
          label={
            <HiOutlineFilter className="text-xl font-bold leading-none text-gray-900 dark:text-gray-200" />
          }
          arrowIcon={false}
          placement="left-start"
          inline={true}
        >
          <Dropdown.Item>Day</Dropdown.Item>
          <Dropdown.Item>Month</Dropdown.Item>
          <Dropdown.Item>Year</Dropdown.Item>
        </Dropdown>
      </div>
      <Tabs.Group aria-label="Pills" style="pills">
        <Tabs.Item active={true} title="List">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell className="!p-4">
                <Checkbox />
              </Table.HeadCell>
              <Table.HeadCell>Project name</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Assigned</Table.HeadCell>
              <Table.HeadCell>Due Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data ? (
                data?.map(({ label, id, content, created_at }: StoryProps) => (
                  <Table.Row
                    key={id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="!p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {label}
                    </Table.Cell>
                    <Table.Cell>{content}</Table.Cell>
                    <Table.Cell>
                      <Badge color="info">Todo</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar rounded={true} />
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(created_at).toLocaleDateString()}
                    </Table.Cell>
                  </Table.Row>
                ))
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
    </div>
  );
};
export default Projects;

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("id")
  return {
    props: {
      data,
      error,
    },
  };
}
