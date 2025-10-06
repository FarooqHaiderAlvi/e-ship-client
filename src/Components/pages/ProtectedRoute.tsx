import React, { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchLoggedInUser } from "../../store/features/auth/authThunk";
import { type AppDispatch, type RootState } from "../../store/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoadingUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user === null) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, user]);

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
