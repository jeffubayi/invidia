// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoryProps } from "../../../utils";
import { supabase } from "../../../utils/supabaseClient";


type Data = {
  data?: StoryProps[];
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  supabase.auth.api.setAuthCookie(req, res);
}