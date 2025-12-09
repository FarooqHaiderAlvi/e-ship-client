import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import spinner from "../../../assets/icons/spinner.gif";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { type AppDispatch } from "../../../store/store";
import { resetPassword } from "../../../store/features/auth/authThunk";

// 🔹 Zod Schema
const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // 🔹 We expect a reset token in URL:  /reset-password?token=xxx
  const params = useParams();
  const token = params?.token;
  console.log(token, "tokrn");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    if (!token) {
      showErrorToast("Invalid or missing reset token.");
      return;
    }

    try {
      const resultAction = await dispatch(
        resetPassword({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        showSuccessToast("Password reset successfully! Please log in.");
        navigate("/login");
      } else {
        const errorMessage =
          (resultAction.payload as string) || "Reset failed. Please try again.";

        reset();
        setError("root", { type: "manual", message: errorMessage });
        showErrorToast(errorMessage);
      }
    } catch (err) {
      console.log("Unexpected error", err);
      reset();
      showErrorToast("Something went wrong. Try again.");
      setError("root", {
        type: "manual",
        message: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-white">
      <div className="max-w-sm w-full border border-gray-700 p-6 rounded-md space-y-4">
        {/* Instagram Logo */}
        <div
          className="mx-auto mb-2"
          style={{
            backgroundImage:
              "url('https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png')",
            backgroundPosition: "0px 0px",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            width: "175px",
            height: "51px",
          }}
        ></div>

        <h2 className="text-center text-lg font-semibold mb-3">
          Reset Your Password
        </h2>

        {/* Reset Form */}
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="New Password (min 6 chars)"
              className={`w-full px-2 py-1.5 border bg-black text-white text-sm rounded-sm 
                focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-blue-400"
                }`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className={`w-full px-2 py-1.5 border bg-black text-white text-sm rounded-sm 
                focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-600 focus:ring-blue-400"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition flex justify-center items-center h-[36px] disabled:opacity-50"
          >
            {isSubmitting ? (
              <img src={spinner} alt="loading" className="h-6 w-6" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
