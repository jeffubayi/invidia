import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import { Label, TextInput, Button,Card } from "flowbite-react";

const Signin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      toast.success("Check your email for the login link!");
    } catch (error) {
      error instanceof Error && alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
        >
          <Card>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Sign in via magic link" />
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
         
          <Button type="submit">
            {loading ? "Loading" : "Send magic link"}
          </Button>
           </Card>
        </form>
      </div>
    </>
  );
};
export default Signin;
