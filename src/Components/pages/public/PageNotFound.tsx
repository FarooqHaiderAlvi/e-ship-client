import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12">
      <div className="text-center space-y-6 animate-fadeIn">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-white tracking-widest">404</h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Optional image — looks like Instagram broken link */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/103/103085.png"
          alt="Not Found"
          className="w-20 h-20 opacity-70 mx-auto"
        />

        {/* Back button */}
        <Link
          to="/"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-md text-sm font-medium"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
