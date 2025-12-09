import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import spinner from "../../../assets/icons/spinner.gif";
import { type AppDispatch } from "../../../store/store";
import { loginUser } from "../../../store/features/auth/authThunk";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  name: z.string().min(2, "Username or Email is required"),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  // 🔹 Local state
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 🔹 Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // 🔹 Login handler
  const handleLogIn = async (data: LoginFormData) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        showSuccessToast("Login successful! Welcome back!");
        console.log("Login successful:", resultAction.payload);
        navigate("/");
      } else {
        // ❌ Error toast (red) - Backend error
        console.log("log541", resultAction.payload);
        reset();
        const errorMessage =
          (resultAction.payload as string) || "Login failed. Please try again.";
        showErrorToast(errorMessage);
        // Also set form error for display
        setFormError("root", {
          type: "manual",
          message: errorMessage,
        });
      }
    } catch (err) {
      // ❌ Error toast (red) - Unexpected error
      reset();
      console.log("log5412");
      showErrorToast("An unexpected error occurred. Please try again.");
      setFormError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
      console.error("Unexpected error:", err);
    }
  };

  // 🔹 Render login form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-4 text-white">
      <div className="max-w-sm w-full space-y-4 border border-gray-700 p-6 rounded-md shadow-sm">
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
          role="img"
          aria-label="Instagram logo"
        ></div>

        {/* Login Form */}
        <form className="space-y-3" onSubmit={handleSubmit(handleLogIn)}>
          <div>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Username or Email"
              className={`w-full px-2 py-1.5 border bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-600 focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
              className={`w-full px-2 py-1.5 border bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 ${
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition flex justify-center items-center h-[36px] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <img src={spinner} alt="Loading2..." className="h-6 w-6" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <Link to="/forgot-password" className="text-xs text-blue-400">
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Footer - Sign Up link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-400 font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
