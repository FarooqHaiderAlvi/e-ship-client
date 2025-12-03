import React, { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUser } from "../store/features/auth/authThunk";
import { type AppDispatch, type RootState } from "../store/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * Purpose: Protects private pages - only authenticated users can access
 * 
 * Behavior:
 * - If user IS authenticated → Render the component (allow access)
 * - If user is NOT authenticated → Redirect to /login (block access)
 * 
 * Use case: Wrap Profile, Orders, Settings pages that require authentication
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoadingUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, user]);

  // Show loading while checking authentication
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // If user is authenticated, allow access
  // If not authenticated, redirect to login
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

