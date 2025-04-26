import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment/PaymentPage";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentCancel from "./pages/payment/PaymentCancel";
import HomePage from './pages/HomePage';
import Review from './pages/Review';
import LocationPicker  from './pages/restaurant/LocationPicker';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/review" element={<Review />} />
        <Route path="/registerRestaurant" element={<LocationPicker />} />
        <Route path="/deliveryDashboard" element={<DeliveryDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
