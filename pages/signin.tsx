/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { Label, TextInput, Button } from "flowbite-react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

const Signin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (email: string) => {
    console.log("user1",email,password)
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      console.log("user1",error)
      toast.error(`${error}`);
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-200 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src="https://assets-global.website-files.com/61a05ff14c09ecacc06eec05/61f5a0886a493ac4ff3aa69a_10_best_productivity_2.png"
                alt="INVIDIA"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Sign in
                </h1>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                  }}
                >
                  <div className=" block">
                    <Label htmlFor="email1" value="Email address" />
                  </div>
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    disabled={loading}
                  />
                  <div className=" block">
                    <Label htmlFor="email1" value="Password" />
                  </div>
                  <TextInput
                    id="email1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    disabled={loading}
                  />

                  <Button type="submit">
                    {loading ? "Loading" : "Log in"}
                  </Button>
                </form>
                <hr className="my-8" />
                <div className="mb-4 flex items-center justify-evenly">
                  <Button color="light">
                    <GoMarkGithub className="mr-3" />
                    Github
                  </Button>
                  <Button color="light">
                    <AiFillTwitterCircle className="mr-3" />
                    Twitter
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
