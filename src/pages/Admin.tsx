type User = {
  id: string;
  name: string;
  email: string;
  status: "Online" | "Offline" | "In Meet";
  lastActive: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@company.com",
    status: "Online",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Dev Team",
    email: "dev@company.com",
    status: "In Meet",
    lastActive: "5 mins ago",
  },
  {
    id: "3",
    name: "Bob",
    email: "bob@company.com",
    status: "Offline",
    lastActive: "1 hour ago",
  },
];

export default function Admin() {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-700 hover:bg-gray-700/50"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4 text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Online"
                        ? "bg-green-600"
                        : user.status === "In Meet"
                        ? "bg-yellow-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {user.lastActive}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
