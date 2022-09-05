import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Avatar from "./avatar";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { Card, Label, TextInput, Button } from "flowbite-react";

interface User {
  username: string | undefined;
  website: string | undefined;
  avatar_url: string | undefined;
}

export default function Account() {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [session, setSession] = useState<Session | null>();

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

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        if (typeof window !== "undefined") localStorage.setItem("user", data.username);
      }
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }: User) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
  
      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={() => updateProfile({ username, website, avatar_url })}
    >
      <Card>
      <h2 className="inline-block align-baseline  text-2xl text-white-500 hover:text-white-800 mb-2 dark:text-white" >
            Settings
          </h2>
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />

        <div className="mb-1 block">
          <Label value="Username" />
        </div>
        <TextInput
          name="label"
          type="text"
          placeholder="user name"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="mb-1 block">
          <Label value="Email" />
        </div>
        <TextInput
          name="label"
          type="text"
          value={session?.user?.email}
          placeholder="Email"
        />
        <div className="mb-1 block">
          <Label value="Website" />
        </div>
        <TextInput
          name="content"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </Button>
      </Card>
    </form>
  );
}
