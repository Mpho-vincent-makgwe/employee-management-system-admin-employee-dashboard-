import NotificationCard from "../NotificationCard";
import Heading from "../../ui/Heading";

export default function NotificationPage() {
  const notifications = [
    {
      status: "meeting",
      title: "Q1 All-Hands Meeting",
      message:
        "Join us for our quarterly review and planning session. We'll discuss achievements, challenges, and goals for the upcoming quarter.",
      timeAgo: "2 hours ago",
    },
    {
      status: "holiday",
      title: "Company Holiday - New Year’s Day",
      message:
        "Office will be closed on January 1st, 2024. Please plan your work accordingly and ensure all urgent tasks are completed before the holiday.",
      timeAgo: "2 hours ago",
    },
    {
      status: "birthday",
      title: "Upcoming Birthday's",
      message:
        "Emmanuel Faremi birthday is in 2 days (July 7). Consider sending a greeting!",
      timeAgo: "2 hours ago",
    },
    {
      status: "meeting",
      title: "Q1 All-Hands Meeting",
      message:
        "Join us for our quarterly review and planning session. We'll discuss achievements, challenges, and goals for the upcoming quarter.",
      timeAgo: "2 hours ago",
    },
    {
      status: "holiday",
      title: "Company Holiday - New Year’s Day",
      message:
        "Office will be closed on January 1st, 2024. Please plan your work accordingly and ensure all urgent tasks are completed before the holiday.",
      timeAgo: "2 hours ago",
    },
    {
      status: "birthday",
      title: "Upcoming Birthday's",
      message:
        "Emmanuel Faremi birthday is in 2 days (July 7). Consider sending a greeting!",
      timeAgo: "2 hours ago",
    },
  ];

  return (
    <main className="bg-gray-100 overflow-hidden">
      <div className="mx-auto">
        {/* Header */}
        <Heading
          title="Notifications"
          subtitle="Stay updated with your leave requests and approvals."
          // position={true}
        />

        {/* Notifications */}
        {/* Notifications Container */}
        <div className="bg-white justify-center items-center center  rounded-lg overflow-hidden p-4 space-y-4">
          {notifications.map((req, index) => (
            <NotificationCard key={index} {...req} />
          ))}
        </div>
      </div>
    </main>
  );
}
