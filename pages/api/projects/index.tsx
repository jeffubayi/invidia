// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ProjectProp } from "../../../utils";
import { supabase } from "../../../utils/supabaseClient";

type Data = {
  data?: ProjectProp[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user_id =    (typeof window !== "undefined") && sessionStorage.getItem("user_id")
    let { data, error,status } = await supabase.from("projects").select("*").eq("user_id", user_id);

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