/* eslint-disable @next/next/no-img-element */
import { Card, Badge } from "flowbite-react";
import { useRouter } from "next/router";
import { HiClock } from "react-icons/hi";
import { StoryProps } from "../utils";

const DashboardProjects = (stories: StoryProps) => {
  const { label, content, id, created_at } = stories;
  const router = useRouter();

  return (
    <div className="py-1">
      <Card>
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
    </div>
  );
};

export default DashboardProjects;
