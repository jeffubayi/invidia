import { Button, Timeline } from "flowbite-react";
import { HiOutlineTag } from "react-icons/hi";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const TimelineArea = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState();
  const fetchQuotes = () => {
    axios.get("https://type.fit/api/quotes").then((res) => {
      const item = res.data[Math.floor(Math.random() * res.data?.length)];
      setQuotes(item);
    });
  };
  fetchQuotes();

  return (
    <div className="m-4">
      <Timeline>
        <Timeline.Item>
          <Timeline.Point icon={HiOutlineTag} />
          <Timeline.Content>
            <Timeline.Time>Quote of the day</Timeline.Time>
            <Timeline.Title>
              {" "}
              Everyones sees what you appear to be , few really know what you
              are{" "}
            </Timeline.Title>
            <Timeline.Body>- Machia velli</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
      <div className="flex justify-center ">
        <Button size="xs" color="gray" onClick={() => router.push("/quotes")}>
          Show more quotes
        </Button>
      </div>
    </div>
  );
};

export default TimelineArea;
