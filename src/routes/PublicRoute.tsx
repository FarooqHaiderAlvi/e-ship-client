import React, { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchLoggedInUser } from "../store/features/auth/authThunk";
import { type AppDispatch, type RootState } from "../store/store";

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string; // Where to redirect if user is already authenticated
}

/**
 * PublicRoute Component
 *
 * Purpose: Prevents authenticated users from accessing public pages (like Login/SignUp)
 *
 * Behavior:
 * - If user is NOT authenticated → Render the component (allow access)
 * - If user IS authenticated → Redirect to home/dashboard (prevent access)
 *
 * Use case: Wrap Login and SignUp pages so logged-in users can't access them
 */
const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/", // Default redirect to home
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoadingUser } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, user]);

  // Show loading while checking authentication
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  // If user is authenticated, redirect them away from public pages
  // This prevents logged-in users from accessing Login/SignUp pages
  if (user) {
    // Redirect to the specified path, or to the page they were trying to access before
    const from = (location.state as { from?: string })?.from || redirectTo;
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, allow access to public page
  return <>{children}</>;
};

export default PublicRoute;
