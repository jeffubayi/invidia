// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoryProps } from "../../../utils";
import { supabase } from "../../../utils/supabaseClient";

type Data = {
  id?: string | number;
  story?: StoryProps;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id;
  const { data } = await supabase.from("stories").select();
  const deleteStory = async () => {
    await supabase.from("stories").delete().eq("id", id);
  };
  const updateStory = async () => {
    const body = JSON.parse(req.body);
    const { label, content, id } = body.values;
    await supabase
      .from("stories")
      .update([
        {
          label,
          content,
          updated_at: new Date(),
        },
      ])
      .match({ id: id });
  };
  if (req.method == "GET") {
    data?.forEach((story) => {
      if (story.id == Number(id)) {
        res.status(200).json({ story, message: `Story ${story.label} found` });
      }
    });
  }
  if (req.method == "PUT") {
    data?.forEach((story) => {
      if (story.id == Number(id)) {
        updateStory();
        res
          .status(200)
          .json({ story, message: `Story ${story.label}  edited` });
      }
    });
  }
  if (req.method == "DELETE") {
    data?.forEach((story) => {
      if (story.id == Number(id)) {
        deleteStory();
        res
          .status(200)
          .json({ story, message: `Story ${story.label}  deleted` });
      }
    });
  }
}
