import Head from "next/head";
import AppBar from "./appbar";
import BottomNav from "./bottom-nav";
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
      <body className="dark:bg-gray-900">
        {isLayoutRequired ? null : <AppBar />}
        <main className=" mx-auto max-w-screen-md  pb-10 pb-2  ">
          <div className="p-6">{children}</div>
        </main>

        {isLayoutRequired ? null : <BottomNav />}
      </body>
    </>
  );
};

export default Layout;
