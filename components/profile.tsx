import { Card, Avatar, Button } from "flowbite-react";
import { useRouter } from "next/router";
import { StoryProps } from "../utils";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import {FcViewDetails,FcAbout,FcCalendar,FcComboChart} from  "react-icons/fc";

const ProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [session, setSession] = useState<Session | null>();
  const router = useRouter();

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
    <div className="max-w-sm">
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
            {username }
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {website || session?.user?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button size="xs"  onClick={()=> router.push("/settings")} outline={false}>
              Edit profile
            </Button>
            <Button size="xs" color="gray">
              Members
            </Button>
          </div>
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Current overall performance
        </p>
        <ul className="my-1 space-y-3">
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcViewDetails/>
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">Projects</span>
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
            <FcAbout/>
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">Notes</span>
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
           <FcCalendar/>
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">Calender</span>
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
             <FcComboChart/>
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">Reports</span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                0
              </span>
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ProfileCard;
