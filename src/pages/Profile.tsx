import { useAuthStore } from "../store/auth.store";

export default function Profile() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={user?.avatar || "/default-avatar.png"}
            className="w-28 h-28 rounded-full"
          />
          <label className="absolute bottom-1 right-1 bg-gray-700 p-1 rounded cursor-pointer">
            📷
            <input type="file" hidden />
          </label>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-sm mt-1">Role: {user?.role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-semibold mb-1">Achievements</h4>
          <p className="text-gray-300">🏆 Employee of the Month</p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Interests</h4>
          <p className="text-gray-300">AI, Backend Systems, DevOps</p>
        </div>
      </div>
    </div>
  );
}
