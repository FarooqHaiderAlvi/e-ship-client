import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";
import spinner from "../../../assets/icons/spinner.gif";
import { type AppDispatch } from "../../../store/store";
import { signupUser } from "../../../store/features/auth/authThunk";

// Define validation schema with Zod
const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

// Infer TypeScript type from schema
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  // 🔹 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // 🔹 Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // 🔹 Signup handler
  const onSubmit = async (data: SignupFormData) => {
    try {
      const resultAction = await dispatch(signupUser(data));

      if (signupUser.fulfilled.match(resultAction)) {
        // ✅ Success toast (green)
        showSuccessToast("Account created successfully! Welcome!");
        console.log("Signup successful:", resultAction.payload);
        navigate("/");
      } else {
        // ❌ Error toast (red) - Backend error
        console.log("log541", resultAction.payload);
        reset();
        const errorMessage =
          (resultAction.payload as string) ||
          "Signup failed. Please try again.";
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

  // 🔹 Render signup form
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

        {/* Signup Form */}
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Full Name"
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

          {/* Email Field */}
          <div>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Email"
              className={`w-full px-2 py-1.5 border bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-600 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition flex justify-center items-center h-[36px] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <img src={spinner} alt="Loading2..." className="h-6 w-6" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>

      {/* Footer - Login link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
