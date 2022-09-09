import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";
import {
  Label,
  TextInput,
  Button,
  Dropdown,
  Timeline,
  Card,
} from "flowbite-react";
import Link from "next/link";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";
import {
  HiOutlineTag,
  HiOutlineFilter,
} from "react-icons/hi";
import axios from "axios";

const Projects = () => {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = () => {
    axios.get("https://type.fit/api/quotes").then((res) => setQuotes(res.data));
  };
  fetchQuotes();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Quotes
        </h5>
        <Dropdown
          label={
            <HiOutlineFilter className="text-xl font-bold leading-none text-gray-900 dark:text-white" />
          }
          arrowIcon={false}
          placement="left-start"
          inline={true}
        >
          <Dropdown.Item>Day</Dropdown.Item>
          <Dropdown.Item>Month</Dropdown.Item>
          <Dropdown.Item>Year</Dropdown.Item>
        </Dropdown>
      </div>
      <Card>
        <Timeline>
          {quotes?.map(({ text, author }) => (
            <Timeline.Item key={text}>
              <Timeline.Point icon={HiOutlineTag} />
              <Timeline.Content>
                <Timeline.Time>Quote of the day</Timeline.Time>
                <Timeline.Title>{text}</Timeline.Title>
                <Timeline.Body>- {author}</Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};
export default Projects;
