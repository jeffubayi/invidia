import { supabase } from "../utils/supabaseClient";
import { getToday } from "../utils";
import { Badge, Tabs } from "flowbite-react";
import {
  HiOutlineSortDescending,
  HiOutlineClipboardCheck,
  HiSparkles,
  HiOutlineTable,
} from "react-icons/hi";
import { StoryProps } from "../utils";
import toast from "react-hot-toast";
import StoryCard from "../components/story-list";
import Skeleton from "../components/skeleton";
import Profile from "../components/profile";
import Latest from "../components/list-card";

const Dashboard = ({ data, error }: { data: StoryProps[]; error: any }) => {
  if (error) return toast.error("Error fetching");
  return (
    <>
      <div className="container">
        <>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Dashboard
            </h5>
            <Badge color="gray">{getToday()}</Badge>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Profile />
            <div className="col-span-3 ">
              <div>
                <Tabs.Group aria-label="Default tabs" style="underline">
                  <Tabs.Item
                    active={true}
                    icon={HiOutlineSortDescending}
                    title="Pinned"
                  >
                    {data ? (
                      data?.map(
                        ({ label, id, content, created_at }: StoryProps) => (
                          <Latest
                            key={id}
                            id={id}
                            label={label}
                            content={content}
                            created_at={created_at}
                          />
                        )
                      )
                    ) : (
                      <Skeleton />
                    )}
                  </Tabs.Item>
                  <Tabs.Item title="Doing this week" icon={HiOutlineTable}>
                    <Skeleton />
                  </Tabs.Item>
                  <Tabs.Item title="Doing today" icon={HiSparkles}>
                    <Skeleton />
                  </Tabs.Item>
                  <Tabs.Item title="Completed" icon={HiOutlineClipboardCheck}>
                    <Skeleton />
                  </Tabs.Item>
                </Tabs.Group>
              </div>
            </div>
            <StoryCard />
          </div>
        </>
      </div>
    </>
  );
};
export default Dashboard;

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at")
    .limit(5);
  return {
    props: {
      data,
      error,
    },
  };
}
