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
    const body = JSON.parse(req.body);
    console.log("body", body);
    const { title, description, created_at, completed, assigned, statuses,user_id } =
      body.values;
    const { data, error, status } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          created_at,
          completed,
          assigned,
          statuses,
          user_id
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
