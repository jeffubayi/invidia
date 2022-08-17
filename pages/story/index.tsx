import StoryCard from "../../components/story-card";
import { StoryProps, fetcher } from "../../utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Button, Spinner } from "flowbite-react";

const Story = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/stories", fetcher);
  if (error) return toast.error("Error fetching");
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info"/>
        Loading stories..
      </div>
    );
  return (
    <div className="m-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="inline-block align-baseline  text-2xl text-white-500 hover:text-white-800 dark:text-white">
          Your stories
        </h2>

        <Button onClick={() => router.push(`story/create`)}>Create</Button>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {data.data?.map(({ label, id, content }: StoryProps) => (
          <StoryCard key={id} id={id} label={label} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Story;
