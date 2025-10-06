import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../assets/Spinner2.gif"; // Ensure you have a spinner image in the specified path
import { type AppDispatch, type RootState } from "../../store/store"; // Adjust path if needed
import {
  loginUser,
  fetchLoggedInUser,
} from "../../store/features/auth/authThunk";

export default function Login() {
  // 🔹 Local state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoadingUser } = useSelector((state: RootState) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch logged-in user on mount
  useEffect(() => {
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, user]);

  // 🔹 Input handler
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  // 🔹 Login handler
  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login successful:", resultAction.payload);
        navigate("/");
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Show loading spinner
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <img src={spinner} alt="Loading..." className="h-[100px] w-[100px]" />
      </div>
    );
  }

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
        <form className="space-y-3" onSubmit={handleLogIn}>
          <input
            type="text"
            id="email"
            onChange={handleOnChange}
            value={email}
            placeholder="Username or Email"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="password"
            id="password"
            onChange={handleOnChange}
            value={password}
            placeholder="Password"
            className="w-full px-2 py-1.5 border border-gray-600 bg-black text-white text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 text-sm rounded-md hover:bg-blue-600 transition flex justify-center items-center h-[36px]"
            disabled={loading}
          >
            {loading ? (
              <img src={spinner} alt="Loading..." className="h-6 w-6" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center">
          <a href="#" className="text-xs text-blue-400">
            Forgot password?
          </a>
        </div>
      </div>

      {/* Footer - Sign Up link */}
      <div className="max-w-sm w-full text-center text-sm text-gray-400 mt-4 border border-gray-700 p-4 rounded-md">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-400 font-semibold">
          Sign up
        </Link>
      </div>

      {/* App Download Badges */}
      <div className="max-w-sm w-full flex justify-center gap-2 mt-6">
        <a
          href="https://play.google.com/store/apps/details?id=com.instagram.android"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://static.cdninstagram.com/rsrc.php/v4/yz/r/c5Rp7Ym-Klz.png"
            alt="Get it on Google Play"
            className="h-10"
          />
        </a>
        <a
          href="ms-windows-store://pdp/?productid=9nblggh5l9xt"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://static.cdninstagram.com/rsrc.php/v4/yu/r/EHY6QnZYdNX.png"
            alt="Get it from Microsoft"
            className="h-10"
          />
        </a>
      </div>
    </div>
  );
}
