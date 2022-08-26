/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Card,
  Badge,
  Modal,
  Button,
  Checkbox,
  Label,
  Textarea,
} from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { ProjectProp } from "../../utils";

const DashboardProjects = (projects: ProjectProp) => {
  const { title, id, description, created_at, statuses, completed, assigned } =
    projects;
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="py-1 ">
      <Card onClick={() => setShowModal(true)}>
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
                  <Badge
                    color={
                      statuses === "created"
                        ? "gray"
                        : statuses === "in-progress"
                        ? "info"
                        : "success"
                    }
                  >
                    {statuses}
                  </Badge>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      <Modal show={showModal} size="3xl" onClose={() => setShowModal(false)}>
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
          <Button onClick={() => setShowModal(false)}>Update project</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardProjects;
