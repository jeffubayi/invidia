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
      <section className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-gray-400">
          {greeting()}
        </h5>
        <Badge color="gray">{getToday()}</Badge>
      </section>
      <div className="col-span-2 space-y-8 md:grid md:grid-cols-6 md:gap-5 md:space-y-0">
        <section className="md:col-span-1">
          {" "}
          <ProfileCard />
        </section>
        <section className="md:col-span-3">
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
            <Tabs.Item title="Planned" icon={HiOutlineSortDescending}>
              <Skeleton />
            </Tabs.Item>
            <Tabs.Item title="Assigned to me" icon={HiOutlineClipboardCheck}>
              <Skeleton />
            </Tabs.Item>
          </Tabs.Group>
          <div className="my-5 mx-3 ">
            <TimeLineArea />
          </div>
        </section>
        <section className="md:col-span-2">
          <GoalsCard />
        </section>
      </div>
    </>
  );
};
export default Dashboard;

export async function getStaticProps() {
  const user = supabase.auth.user();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at")
    .limit(4);
  return {
    props: {
      data,
      error,
    },
  };
}
