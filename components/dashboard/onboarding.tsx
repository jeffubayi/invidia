import { Button, Timeline } from "flowbite-react";
import { HiOutlineTag,HiArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";

const TimelineArea = () => {
  const router = useRouter();

  return (
    <div className="m-4">
      <Timeline>
        <Timeline.Item>
          <Timeline.Point icon={HiOutlineTag} />
          <Timeline.Content>
            <Timeline.Time>Profile setup</Timeline.Time>
            <Timeline.Title> Welcome to Invidia mate 👋👋 </Timeline.Title>
            <Timeline.Body>
              Start by customizing  your profile account details  to fit your description i.e profile name,photo,bio etc.
            </Timeline.Body>
            <Button  onClick={() =>router.push("/settings")}>
              Setup Profile 
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default TimelineArea;
