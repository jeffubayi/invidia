import Account from "../../components/auth/account";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/gotrue-js/src/lib/types";
import { useRouter } from "next/router";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const Settings = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

 const logout = () => {
    supabase.auth.signOut();
    router.push(`/signin`);
  };

  return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Button color="light" onClick={() => router.back()}>
            <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
          </Button>
         
          <Button color="failure" onClick={logout}>
            Log out
          </Button>
        </div>

        <Account key={session?.user?.id} />
      
      </div>
  );
};
export default Settings;
