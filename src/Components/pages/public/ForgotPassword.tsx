import React from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../store/store";
import { forgotPassword } from "../../../store/features/auth/authThunk";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(resultAction)) {
      console.log("email sent successfully.");
    }
  };

  return (
    <div className="bg-black text-white h-screen w-full flex items-center justify-center px-4">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your email address or username and we’ll send you a reset link
          on your registered email.
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="email or username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
            onClick={handleSubmit}
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-blue-400 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
