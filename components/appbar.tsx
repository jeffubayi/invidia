/* eslint-disable @next/next/no-img-element */
import { DarkThemeToggle, Navbar, Avatar, Dropdown } from "flowbite-react";
import { FC } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import toast from "react-hot-toast";

const AppBar: FC<Record<string, never>> = function () {
  const router = useRouter();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [session, setSession] = useState<Session | null>();
  const [username, setUsername] = useState<string>();

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
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username,avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setUsername(data.username);
      }
    } catch (error) {
      error instanceof Error && toast.error(error.message);
    }
  }

  const logout = () => {
    supabase.auth.signOut();
    router.push(`/`);
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/dashboard">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Invidia-logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Invidia
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <Navbar.Toggle />
        {/* <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img={
                avatar_url
                  ? `https://aaepbxpivppmvuaemajn.supabase.co/storage/v1/object/public/avatars/${avatar_url}`
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{username}</span>
            <span className="block truncate text-sm font-medium">
              {session?.user?.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Item onClick={() => router.push(`/notifications`)}>
            Notifications
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push(`/settings`)}>
            Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
        </Dropdown> */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/dashboard"
          active={router.pathname === "/dashboard"}
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/projects" active={router.pathname === "/projects"}>
          Projects
        </Navbar.Link>
        <Navbar.Link href="/notes" active={router.pathname === "/notes"}>
          Notes
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppBar;
