import { useForm } from "react-hook-form";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const { register, handleSubmit } = useForm<ResetForm>();

  const onSubmit = (data: ResetForm) => {
    console.log("Reset Password:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
