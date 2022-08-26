import { Card, Avatar, Button } from "flowbite-react";
import { useRouter } from "next/router";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { FcSurvey, FcAbout, FcCalendar, FcOvertime } from "react-icons/fc";
import { HiInbox, HiOutlineCog } from "react-icons/hi";
const ProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [session, setSession] = useState<Session | null>();
  const [taskCount, setTaskCount] = useState<number>();
  const [noteCount, setNoteCount] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    (async function getTaskCount() {
      const { count } = await supabase
        .from("tasks")
        .select("*", { count: "exact" });
      setTaskCount(count);
    })();
    (async function getNoteCount() {
      const { count } = await supabase
        .from("stories")
        .select("*", { count: "exact" });
      setNoteCount(count);
    })();
  });

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user?.id)
        .single();
      console.log(`profile`, data);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="hidden lg:block">
      <Card>
        <div className="flex flex-col items-center pb-5">
          <Avatar
            status="online"
            statusPosition="bottom-right"
            rounded={true}
            bordered={true}
            size="lg"
            img={
              avatar_url
                ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${avatar_url}`
                : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            alt="Admin user"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {website || session?.user?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button
              size="xs"
              onClick={() => router.push("/settings")}
              outline={false}
            >
              <HiOutlineCog className="mr-1" />
              Profile
            </Button>
            <Button size="xs" color="gray">
              <HiInbox className="mr-1" />
              Invite
            </Button>
          </div>
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Performance tools
        </p>
        <ul className="my-1 space-y-3">
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcSurvey />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Tasks
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                {taskCount || 0}
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcAbout />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Notes
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                {noteCount || 0}
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcCalendar />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Calender
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                0
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcOvertime />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Pomodoro
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                Start
              </span>
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ProfileCard;
