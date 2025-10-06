import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store"; // adjust path based on your store file
import ProductDetails from "./Components/ProductDetails";
// import SignUp from "./pages/SignUp";
import Login from "./Components/pages/Login";
import CartDetails from "./Components/CartDetails";
import Home from "./Components/Home";
import PaymentSuccess from "./Components/PaymentSuccess";
// import Inbox from "./Components/Inbox";
// import ProtectedRoute from "./Components/pages/ProtectedRoute";
// import Notifications from "./Components/Notifications";
// import Layout from "./Components/Layout";

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
