import Head from "next/head";
import AppBar from "./appbar";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const router = useRouter();
  const isLayoutRequired =
    typeof window !== "undefined" && router.pathname === "/signin";
  return (
    <>
      <Head>
        <title className="p-1">
          Invidia {}
          {router?.pathname.replace("/", "|")}
        </title>
      </Head>
      <body className=" bg-gray-200 dark:bg-gray-900 ">
        <AppBar />
        <main className=" mx-auto max-w-screen-xl  pb-10  ">
          <div className="p-6">{children}</div>
        </main>
      </body>
    </>
  );
};

export default Layout;
