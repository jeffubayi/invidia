import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { Button, Timeline, Spinner, Card } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";
import Signin from "./signin";
import { StoryProps } from "../utils";
import toast from "react-hot-toast";
import StoryCard from "../components/story-list";
import Wallet from "../components/wallet-card"

const Index = ({ data, error }: { data: StoryProps[]; error: any }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (error) return toast.error("Error fetching");
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="info" />
        Loading stories..
      </div>
    );
  return (
    <>
      <div className="container">
        {session ? (
          <>
            <Timeline>
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <Timeline.Time>Today</Timeline.Time>
                  <Timeline.Title>Welcome back</Timeline.Title>
                  <Timeline.Body>
                    Your email <b>{session?.user?.email} </b>has been verified
                    successfully.
                    <br /> You can now head over to finish up on setting your
                    profile details
                  </Timeline.Body>
                  <Button color="gray" onClick={() => router.push("/settings")}>
                    Profile settings
                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
            <div className="mb-4 flex items-center justify-between">
            <div className="max-w-sm">
              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Stories
                  </h5>
                  <div
                    onClick={() => router.push(`/story`)}
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View all
                  </div>
                </div>
                {data?.map(({ label, id, content, created_at }: StoryProps) => (
                  <StoryCard
                    key={id}
                    id={id}
                    label={label}
                    content={content}
                    created_at={created_at}
                  />
                ))}
              </Card>
            </div>
            <Wallet/>
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
    .limit(4);
  return {
    props: {
      data,
      error,
    },
  };
}
