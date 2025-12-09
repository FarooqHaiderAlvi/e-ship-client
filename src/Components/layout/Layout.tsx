import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 *
 * Wraps all pages with the Navbar
 * Navbar is hidden on Login and SignUp pages
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  console.log(location, "log18");
  // Hide Navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
