import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="h-14 flex items-center justify-between px-6 bg-gray-800 border-b border-gray-700">
      {/* App Title */}
      <span className="font-semibold">Company Chat</span>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          placeholder="Search users or chats..."
          className="bg-gray-700 px-3 py-1.5 rounded text-sm focus:outline-none"
        />

        {/* Create Group */}
        <button
          className="bg-blue-600 px-3 py-1.5 rounded text-sm hover:bg-blue-700"
          onClick={() => alert("Open Create Group Modal")}
        >
          + Create Group
        </button>

        {/* Profile */}
        <div className="relative">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => alert("Logout")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
