import { useAuthStore } from "../store/auth.store";

export default function Topbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="h-14 flex items-center justify-between px-6 bg-gray-800 border-b border-gray-700">
      <span className="font-semibold">Company Chat</span>

      <div className="flex items-center gap-3">
        <span className="text-green-400 text-sm">● Online</span>
        <span className="text-sm">{user?.email ?? "employee@company.com"}</span>
      </div>
    </div>
  );
}
