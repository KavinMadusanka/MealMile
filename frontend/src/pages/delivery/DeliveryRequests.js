import React from 'react';
import './../../components/style/DeliveryRequests.css';

function DeliveryRequests() {
  return (
    <div className="profile-container">
      <div className="sidebar">
        <button className="sidebar-btn">My Profile</button>
        <button className="sidebar-btn active">Delivery Requests</button>
        <button className="sidebar-btn">Tracking Updates</button>
        <button className="sidebar-btn">Delivery History</button>
        <button className="sidebar-btn logout-btn">Logout</button>
        <div className="sidebar-image">
          <img
            src="https://img.freepik.com/free-vector/delivery-service-concept-illustration_114360-2606.jpg"
            alt="Delivery"
          />
        </div>
      </div>

      <div className="details-section">
        <h1>My Delivery Requests</h1>

        <div className="request-card">
          <p><strong>Delivery Id :</strong></p>
          <p><strong>Restaurant Name :</strong></p>
          <p><strong>Restaurant Location :</strong></p>
          <p><strong>Delivery Location :</strong></p>
          <div className="buttons">
            <button className="accept-btn">Accept</button>
            <button className="reject-btn">Reject</button>
          </div>
        </div>

        <div className="request-card">
          <p><strong>Delivery Id :</strong></p>
          <p><strong>Restaurant Name :</strong></p>
          <p><strong>Restaurant Location :</strong></p>
          <p><strong>Delivery Location :</strong></p>
          <div className="buttons">
            <button className="accept-btn">Accept</button>
            <button className="reject-btn">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryRequests;
