import "../styles/globals.css";
import Layout from "../components/layout";
import { Flowbite, Spinner } from "flowbite-react";
import { AppProps } from "next/app";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { theme } from "../styles";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = supabase.auth.user();

  // @TODO add route protection for /signin and /signup
  useEffect(() => {
    if (user) {
      if (router.pathname === "/signin") {
        router.push("/");
      }
    }
  }, [router.pathname, user, router]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner size="lg" /> Loading Invidia
        </div>
      }
    >
      <Flowbite theme={{ theme }}>
        <Layout>
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
        </Layout>
      </Flowbite>
    </Suspense>
  );
}

export default MyApp;
