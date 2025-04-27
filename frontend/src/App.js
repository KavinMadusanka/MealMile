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
import RestaurantRegistration  from './pages/restaurant/RestaurantRegistration';
import DeliveryHistory from './pages/delivery/DeliveryHistory';
import DeliveryRequests from './pages/delivery/DeliveryRequests';
import TrackingUpdates from './pages/delivery/TrackingUpdates';

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
        <Route path="/RestaurantRegistration" element={<RestaurantRegistration />} />
        <Route path="/deliveryHistory" element={<DeliveryHistory />} />
        <Route path="/deliveryRequests" element={<DeliveryRequests />} />
        <Route path="/trackingUpdates" element={<TrackingUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;
