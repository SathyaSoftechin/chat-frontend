type Meet = {
  id: string;
  title: string;
  time: string;
  participants: string[];
  status: "Upcoming" | "Ongoing" | "Completed";
};

const meets: Meet[] = [
  {
    id: "1",
    title: "Daily Standup",
    time: "Today, 10:00 AM",
    participants: ["Alice", "Bob", "Dev Team"],
    status: "Ongoing",
  },
  {
    id: "2",
    title: "Sprint Planning",
    time: "Tomorrow, 3:00 PM",
    participants: ["Dev Team"],
    status: "Upcoming",
  },
];

export default function Meets() {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meetings</h2>
        <button className="bg-blue-600 px-4 py-2 rounded">
          + Schedule Meet
        </button>
      </div>

      <div className="space-y-4">
        {meets.map((meet) => (
          <div
            key={meet.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{meet.title}</h3>
              <p className="text-sm text-gray-400">{meet.time}</p>
              <p className="text-sm text-gray-500">
                Participants: {meet.participants.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  meet.status === "Ongoing"
                    ? "bg-green-600"
                    : meet.status === "Upcoming"
                    ? "bg-yellow-600"
                    : "bg-gray-600"
                }`}
              >
                {meet.status}
              </span>

              <button className="bg-blue-600 px-3 py-2 rounded">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
