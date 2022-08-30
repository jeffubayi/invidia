import Head from "next/head";
import AppBar from "./appbar";
import LandingAppBar from "./bottom-nav";
import { useRouter } from "next/router";
import { Footer } from "flowbite-react";
interface Props {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const router = useRouter();
  const isLayoutRequired =
    (typeof window !== "undefined" && router.pathname === "/") ;
  return (
    <>
      <Head>
        <title className="p-1">
          {router?.pathname === "/"
            ? "Invidia"
            : `${router?.pathname.slice(1)} | invidia`}
        </title>
      </Head>

      <body className=" bg-gray-100 dark:bg-gray-900 ">
        {isLayoutRequired ? <LandingAppBar /> : <AppBar />}
        <main className=" mx-auto max-w-screen-xl  pb-10  ">
          <div className="p-6">{children}</div>
        </main>
      </body>
    </>
  );
};

export default Layout;
