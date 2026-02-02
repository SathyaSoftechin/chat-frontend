import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4 space-y-2">
      <NavLink to="/chats" className="block p-2 rounded hover:bg-gray-700">
        Chats
      </NavLink>
      <NavLink to="/meets" className="block p-2 rounded hover:bg-gray-700">
        Meets
      </NavLink>
      <NavLink to="/admin" className="block p-2 rounded hover:bg-gray-700">
        Admin
      </NavLink>
    </aside>
  );
}
