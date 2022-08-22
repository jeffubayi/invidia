import {Button} from "flowbite-react";
import { useRouter } from "next/router";

const ProjectSkeleton = () => {
  const router = useRouter();
  return (
    <>
      <div className="py-1">
        <div
          role="status"
          className="  rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 "
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center mt-4 space-x-3">
              <svg
                className="w-14 h-14 text-gray-300 dark:text-gray-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div>
              <Button
                color="gray"
                size="xs"
                onClick={() => router.push(`/projects`)}
              >
                Add new project
              </Button>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};
export default ProjectSkeleton;
