import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { getToday } from "../utils";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { Badge, Button, Label, Modal, Tabs, TextInput } from "flowbite-react";
import {
  HiOutlineSortDescending,
  HiOutlineClipboardCheck,
  HiSparkles,
  HiOutlineTable,
} from "react-icons/hi";
import { useRouter } from "next/router";
import Signin from "./signin";
import { StoryProps } from "../utils";
import toast from "react-hot-toast";
import StoryCard from "../components/story-list";
import Skeleton from "../components/skeleton";
import Profile from "../components/profile";
import Latest from "../components/list-card";

const Index = ({ data, error }: { data: StoryProps[]; error: any }) => {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (error) return toast.error("Error fetching");
  return (
    <>
      <div className="container">
        {session ? (
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
                      icon={HiOutlineTable}
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
                    <Tabs.Item
                      title="Doing this week"
                      icon={HiOutlineSortDescending}
                    >
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
        ) : (
          <Signin />
        )}
      </div>
    </>
  );
};
export default Index;

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
