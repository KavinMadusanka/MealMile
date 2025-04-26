import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [acceptedDeliveries, setAcceptedDeliveries] = useState([]);
  const [driverInfo, setDriverInfo] = useState({
    location: '',
    phone: '',
    isAvailable: true,
  });

  const fetchData = async () => {
    try {
      const pending = await axios.get('/api/deliveries/pending');
      const accepted = await axios.get('/api/deliveries/accepted');
      const driver = await axios.get('/api/driver/info');

      setPendingDeliveries(pending.data);
      setAcceptedDeliveries(accepted.data);
      setDriverInfo(driver.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateDeliveryStatus = async (deliveryId, newStatus) => {
    try {
      await axios.put(`/api/deliveries/${deliveryId}/status`, { status: newStatus });
      fetchData(); // refresh list
    } catch (error) {
      console.error('Failed to update delivery status:', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.put('/api/driver/update', driverInfo);
      alert('Profile updated!');
    } catch (error) {
      console.error('Failed to update driver profile:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>

      {/* Driver Profile */}
      <div className="mb-6 p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Driver Profile</h3>
        <input
          type="text"
          placeholder="Current Location"
          value={driverInfo.location}
          onChange={(e) => setDriverInfo({ ...driverInfo, location: e.target.value })}
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={driverInfo.phone}
          onChange={(e) => setDriverInfo({ ...driverInfo, phone: e.target.value })}
          className="block mb-2 p-2 border rounded w-full"
        />
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={driverInfo.isAvailable}
            onChange={(e) => setDriverInfo({ ...driverInfo, isAvailable: e.target.checked })}
          />
          <span>Available for Delivery</span>
        </label>
        <button
          onClick={handleProfileUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>

      {/* Pending Deliveries */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Pending Deliveries</h3>
        {pendingDeliveries.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <ul className="space-y-3">
            {pendingDeliveries.map((delivery) => (
              <li key={delivery._id} className="p-3 border rounded shadow flex justify-between items-center">
                <span>{delivery.description}</span>
                <button
                  onClick={() => updateDeliveryStatus(delivery._id, 'accepted')}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Accepted Deliveries */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Accepted Deliveries</h3>
        {acceptedDeliveries.length === 0 ? (
          <p>No accepted deliveries yet.</p>
        ) : (
          <ul className="space-y-3">
            {acceptedDeliveries.map((delivery) => (
              <li key={delivery._id} className="p-3 border rounded shadow flex justify-between items-center">
                <div>
                  <p>{delivery.description}</p>
                  <p>Status: <strong>{delivery.status}</strong></p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateDeliveryStatus(delivery._id, 'in_transit')}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    In Transit
                  </button>
                  <button
                    onClick={() => updateDeliveryStatus(delivery._id, 'delivered')}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Delivered
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
