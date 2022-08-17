import { DarkThemeToggle, Navbar, Avatar, Dropdown } from "flowbite-react";
import Image from "next/image";
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
        .select(` username,avatar_url`)
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
    router.push(`/signin`);
  };

  return (
      <Navbar fluid>
        <Navbar.Brand href="/">
          <Image alt="Flowbite logo" height="24" src="" width="24" />
          <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
            Invidia
          </span>
        </Navbar.Brand>
        <div className="flex  flex-wrap md:order-2 gap-2">
          <Navbar.Toggle />
          <DarkThemeToggle />

          <Dropdown
            inline
            label={
             
                <Avatar
                  img={
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/story">Story</Navbar.Link>
          <Navbar.Link href="/settings">Settings</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
  );
};

export default AppBar;
