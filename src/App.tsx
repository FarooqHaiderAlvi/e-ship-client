import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/layout/Layout";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/pages/public/Login";
import SignUp from "./Components/pages/public/SignUp";
import CartDetails from "./Components/pages/public/CartDetails";
import Home from "./Components/pages/public/Home";
import PaymentSuccess from "./Components/pages/public/PaymentSuccess";
import Checkout from "./Components/pages/public/Checkout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        {/* ============================================
            PUBLIC ROUTES (No Auth Required)
            ============================================ */}

        {/* Shopping Flow - Guest Accessible */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/product-details"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartDetails />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/payment-success"
          element={
            <Layout>
              <PaymentSuccess />
            </Layout>
          }
        />

        {/* Auth Pages - Use PublicRoute (prevents logged-in users) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Layout>
                <Login />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Layout>
                <SignUp />
              </Layout>
            </PublicRoute>
          }
        />

        {/* ============================================
            PRIVATE ROUTES (Auth Required)
            ============================================ */}

        {/* Example: Profile Page */}
        {/* 
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        */}

        {/* Example: Orders Page */}
        {/* 
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        */}

        {/* Example: Order Details Page */}
        {/* 
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        */}

        {/* Example: Wishlist Page */}
        {/* 
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Layout>
                <Wishlist />
              </Layout>
            </ProtectedRoute>
          }
        />
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
