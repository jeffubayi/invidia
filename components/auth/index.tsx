import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast"

export default function Auth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      toast.success("Check your email for the login link!")
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 auth-widget">
        <span className="font-medium m-2 text-zinc-900 dark:text-zinc-50">
          Sign up for free
        </span>
        <div>
          <input
            className="shadow m-2 appearance-none  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="block m-2 p-6 max-w-sm bg-indigo-400 rounded-lg border border-gray-100 shadow-md hover:bg-gray-100 dark:bg-indigo-800  dark:border-zinc-700 dark:hover:bg-indigo-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
