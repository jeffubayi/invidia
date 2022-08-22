import "../styles/globals.css";
import Layout from "../components/layout";
import { Flowbite, Spinner } from "flowbite-react";
import { AppProps } from "next/app";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { theme } from "../styles";
import { Session } from "@supabase/gotrue-js/src/lib/types";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // @TODO add route protection for /signin and /signup
  useEffect(() => {
    if (user) {
      if (router.pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, [router.pathname, user, router, ]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner size="lg" /> Loading...
        </div>
      }
    >
      <Flowbite theme={{ theme }}>
        <Layout>
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
        </Layout>
      </Flowbite>
    </Suspense>
  );
}

export default MyApp;
