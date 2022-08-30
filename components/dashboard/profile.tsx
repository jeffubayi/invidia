import { Card, Avatar, Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { FcBullish, FcFolder, FcPlanner, FcAlarmClock } from "react-icons/fc";
import {
  HiInbox,
  HiOutlineCog,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
const ProfileCard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [session, setSession] = useState<Session | null>();
  const [taskCount, setTaskCount] = useState<number>();
  const [noteCount, setNoteCount] = useState<number>();
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showReports, setShowReports] = useState(false);
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
    <>
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
          <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
            {username}
          </h5>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {website || session?.user?.email}
          </span>
          <div className="mt-2 flex space-x-3 lg:mt-4">
            <Button size="xs" color="gray">
              <HiOutlineCog className="mr-1" />
              Edit profile
            </Button>
          </div>
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Performance tools
        </p>
        <ul className="my-1 space-y-3">
          <li onClick={() => setShowPomodoro(true)}>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcAlarmClock />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Timer
              </span>
              <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                0
              </span>
            </a>
          </li>

          <li onClick={() => setShowCalender(true)}>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcPlanner />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Calender
              </span>
            </a>
          </li>
          <li onClick={() => setShowReports(true)}>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcBullish />
              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Reports
              </span>
            </a>
          </li>

          <li onClick={() => router.push("/notes")}>
            <a
              href="#"
              className="group flex items-center rounded-lg bg-gray-100 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              <FcFolder />

              <span className="ml-3 text-sm flex-1 whitespace-nowrap">
                Notes
              </span>
            </a>
          </li>
        </ul>
      </Card>
      {showPomodoro && (
        <Modal
          show={showPomodoro}
          size="md"
          popup={true}
          onClose={() => setShowPomodoro(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <FcAlarmClock className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Pomodoro timer
              </h3>
              <div className="flex justify-center gap-4">
                <Button>Start</Button>
                <Button color="failure" onClick={() => setShowPomodoro(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {showCalender && (
        <Modal
          show={showCalender}
          size="md"
          popup={true}
          onClose={() => setShowCalender(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <FcPlanner className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Calender
              </h3>
              <div className="flex justify-center gap-4">
                <Button>Connect</Button>
                <Button color="failure" onClick={() => setShowCalender(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {showReports && (
        <Modal
          show={showReports}
          size="md"
          popup={true}
          onClose={() => setShowReports(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <FcBullish className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Reports
              </h3>
              <div className="flex justify-center gap-4">
                <Button>Analyze</Button>
                <Button color="failure" onClick={() => setShowReports(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProfileCard;
