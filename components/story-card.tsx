import { Card } from "flowbite-react";
import { useRouter } from "next/router";
import { StoryProps } from "../utils";

const StoryCard = (stories: StoryProps) => {
  const { label, content, id } = stories;
  const router = useRouter();

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <div
        className="max-w-sm"
        onClick={() =>
          router.push(
            {
              pathname: `/story/${id}`,
              query: { id: id },
            },
            `/story/${id}`
          )
        }
      >
        <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {label}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {content}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StoryCard;
