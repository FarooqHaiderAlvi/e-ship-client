import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../store/store";
import { logout } from "../store/features/auth/authSlice";
import CartIcon from "../assets/icons/cart.svg?react";
import HamburgerIcon from "../assets/icons/hamburger.svg?react";
import CrossIcon from "../assets/icons/cross.svg?react";
import LogoIcon from "../assets/icons/wix-logo.svg?react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex items-center border-b border-gray-300 text-xl p-5 2xl:px-20">
        {/* Left group (Logo + Center Nav) */}
        <div className="flex items-center flex-grow justify-start gap-10 2xl:gap-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LogoIcon className="h-[30px] w-[92px]" />
          </Link>

          {/* Center nav */}
          <div className="hidden xl:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <div className="hover:text-blue-600 transition cursor-pointer">
              Products
            </div>
            <div className="hover:text-blue-600 transition cursor-pointer">
              About
            </div>
            <div className="hover:text-blue-600 transition cursor-pointer">
              Contact
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden xl:flex items-center justify-center space-x-6 ml-auto 2xl:ml-32">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative hover:text-blue-600 transition cursor-pointer"
          >
            <CartIcon className="h-6 w-6" />
            {/* You can add cart count badge here later */}
          </Link>

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.name || user.email}
              </span>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <div className="xl:hidden ml-auto flex items-center gap-4">
          <Link to="/cart" className="relative">
            <CartIcon className="h-6 w-6" />
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <CrossIcon className="h-6 w-6" />
            ) : (
              <HamburgerIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

// Class	 Works On	                    Doesn't Work On
// gap-*	 Only flex or grid containers	Block, inline, child elements (just add spacing not margin not padding)
// space-* Any parent with children	  Empty elements, child elements (add margin)
