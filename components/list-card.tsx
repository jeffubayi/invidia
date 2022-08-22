/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, Badge, Modal, Button } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { StoryProps } from "../utils";

const DashboardProjects = (stories: StoryProps) => {
  const { label, content, id, created_at } = stories;
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="py-1">
      <Card onClick={() => setShowModal(true)}>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li>
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/blog/image-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {content}
                  </p>
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                  <Badge color="gray" icon={HiClock}>
                    {new Date(created_at).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      <Modal show={showModal} size="5xl" onClose={() => setShowModal(false)}>
        <Modal.Header>{`Project #${id} : ${label}`}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {content}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
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
