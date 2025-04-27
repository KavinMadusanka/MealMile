import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../../components/style/ProfilePage.css';

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const DRIVER_ID = '680b9a5f1ca12da0c207f03a'; 

  // Fetch driver data
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get(`http://localhost:8090/api/v1/driver/get/${DRIVER_ID}`); // 👈 Corrected API call
        const myDriver = res.data.driver;

        setDriver(myDriver);
        setName(myDriver.name || '');
        setPhone(myDriver.phone || '');
        setEmail(myDriver.email || '');
        setIsAvailable(myDriver.isAvailable || false);
        setLatitude(myDriver.currentLocation?.lat || '');
        setLongitude(myDriver.currentLocation?.lng || '');
      } catch (err) {
        console.error('Error fetching driver:', err);
      }
    };

    fetchDriver();
  }, []);

  // Update driver data
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!driver) {
      alert('Driver not loaded yet.');
      return;
    }

    try {
      await axios.put(`/api/drivers/location/${driver._id}`, {
        currentLocation: { lat: latitude, lng: longitude },
      });

      await axios.put(`/api/drivers/availability/${driver._id}`, {
        isAvailable,
      });

      alert('Driver details updated successfully!');
    } catch (err) {
      console.error('Error updating driver:', err);
      alert('Error updating driver.');
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <button className="sidebar-btn active">My Profile</button>
        <button className="sidebar-btn">Delivery Requests</button>
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
        <h1>My Details</h1>
        <form className="details-form" onSubmit={handleUpdate}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" disabled placeholder="Not Editable Now" />
          </div>

          <div className="availability-group">
            <label>Are You Available for Delivery?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="available"
                  checked={isAvailable}
                  onChange={() => setIsAvailable(true)}
                />{' '}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="available"
                  checked={!isAvailable}
                  onChange={() => setIsAvailable(false)}
                />{' '}
                No
              </label>
            </div>
          </div>

          <div className="location-section">
            <h3>Update Your Current Location</h3>
            <div className="coordinate-group">
              <div className="input-group">
                <label>Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className="update-btn" type="submit">
            Update
          </button>
        </form>

        <div className="map-container">
          <iframe
            title="Location Map"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
