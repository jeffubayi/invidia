import axios from "axios";

export const fetcher: any = (url: string) =>
  axios.get(url).then((res) => res.data);

export interface StoryProps {
  label: string;
  id: number| string;
  content: string;
}
