// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoryProps } from "../../../utils";
import { supabase } from "../../../utils/supabaseClient";


type Data = {
  data?: StoryProps[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const body = JSON.parse(req.body);
    const user = supabase.auth.user();
    const { label, content, created_at } = body.values;
    const { data, error, status } = await supabase
      .from("stories")
      .insert([
        {
          label,
          content,
          created_at,
          user_id:user.id
        },
      ])
      .single();
    if (error) {
      res.status(status).json({ error: error.message });
    }
    if (data) {
      res.status(200).json({ data });
    }
  } catch (error) {
    error instanceof Error && res.status(500).json({ error: error.message });
  }
}
