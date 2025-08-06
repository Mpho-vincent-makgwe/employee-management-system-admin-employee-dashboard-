import NotificationCard from "./NotificationCard";
import { Bell } from "lucide-react";
import Link from "next/link";

export default function DashboardNotifications() {
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

  const latestNotifications = notifications.slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Custom Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg mb-4 flex items-center gap-2 text-[#2C2C2E]">
          <span>
            <Bell />
          </span>{" "}
          Recent Notifications
        </h2>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {latestNotifications.map((req, index) => (
          <NotificationCard key={index} {...req} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href="/employee/dashboard/notifications"
          className="text-sm text-[#4F46E5] hover:underline mt-2"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
}
