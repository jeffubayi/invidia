import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { StoryProps } from "../utils";

const StoryCard = (stories: StoryProps) => {
  const { label, content, id,created_at } = stories;
  const router = useRouter();

  return (
    <div className="flow-root">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-md font-medium text-gray-900  dark:text-white">
                {label}
              </p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                {content}
              </p>
            </div>
            <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
            {new Date(created_at).toLocaleDateString()}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StoryCard;
