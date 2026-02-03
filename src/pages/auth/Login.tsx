import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth.store";


import { useState } from "react";

import axios from "axios";

type LoginForm = {
  email: string;

  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
  {
    username: data.email,
    password: data.password
  }
);


      const { token, passwordChanged } = res.data;

      // Store token

      localStorage.setItem("token", token);

      // Update auth store

      login({
        email: data.email,

        role: "employee",
      });

      // Route based on password status

      // if (!passwordChanged) {
        // navigate("./ResetPassword.tsx");
      // } else {
        // navigate("/chats");
      // }
      navigate("/chats");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Company Chat Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Company Email"
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
