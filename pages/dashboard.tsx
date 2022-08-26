import { Badge, Tabs } from "flowbite-react";
import {
  HiOutlineSortDescending,
  HiOutlineClipboardCheck,
  HiSparkles,
  HiOutlineFire,
} from "react-icons/hi";
import { ProjectProp } from "../utils";
import toast from "react-hot-toast";
import { supabase } from "../utils/supabaseClient";
import { getToday, greeting } from "../utils";
import GoalsCard from "../components/dashboard/goals-card";
import Skeleton from "../components/skeleton";
import ProfileCard from "../components/dashboard/profile";
import PopularProjects from "../components/dashboard/project-card";
import TimeLineArea from "../components/dashboard/activity";

const Dashboard = ({ data, error }: { data: ProjectProp[]; error: any }) => {
  if (error) return toast.error("Error fetching");
  return (
    <>
      <div className="container">
        <>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {greeting()}
            </h5>
            <Badge color="gray">{getToday()}</Badge>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <ProfileCard />
            <div className="col-span-3 ">
              <div>
                <Tabs.Group aria-label="Default tabs" style="underline">
                  <Tabs.Item active={true} icon={HiOutlineFire} title="Popular">
                    {data ? (
                      data?.map(
                        ({
                          title,
                          id,
                          description,
                          created_at,
                          statuses,
                          completed,
                        }: ProjectProp) => (
                          <PopularProjects
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            created_at={created_at}
                            statuses={statuses}
                            completed={completed}
                          />
                        )
                      )
                    ) : (
                      <Skeleton />
                    )}
                  </Tabs.Item>
                 
                  <Tabs.Item title="Doing today" icon={HiSparkles}>
                    <Skeleton />
                  </Tabs.Item>
                  <Tabs.Item
                    title="Doing this week"
                    icon={HiOutlineSortDescending}
                  >
                    <Skeleton />
                  </Tabs.Item>
                  <Tabs.Item title="Completed" icon={HiOutlineClipboardCheck}>
                    <Skeleton />
                  </Tabs.Item>
                </Tabs.Group>
                <TimeLineArea />
              </div>
            </div>
            <GoalsCard />
          </div>
        </>
      </div>
    </>
  );
};
export default Dashboard;

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at")
    .limit(4);
  return {
    props: {
      data,
      error,
    },
  };
}
