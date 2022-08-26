import { Button, Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { useRouter } from "next/router";

const TimelineArea = () => {
  const router = useRouter();

  return (
    <div className="mx-4">
      <Timeline>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>February 2022</Timeline.Time>
            <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
            <Timeline.Body>
              Get access to over 20+ pages including a dashboard layout, charts,
              kanban board, calendar, and pre-order E-commerce & Marketing
              pages.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>March 2022</Timeline.Time>
            <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
            <Timeline.Body>
              All of the pages and components are first designed in Figma and we
              keep a parity between the two versions even as we update the
              project.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
      <div className="flex justify-center ">
        <Button
          size="xs"
          color="gray"
          onClick={() => router.push("/notifications")}
        >
          Show more activity
        </Button>
      </div>
    </div>
  );
};

export default TimelineArea;
