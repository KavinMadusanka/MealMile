import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');

  const DRIVER_ID = '680b9a5f1ca12da0c207f03a';

  // Fetch driver data
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get(`http://localhost:8090/api/v1/driver/get/${DRIVER_ID}`);
        const myDriver = res.data.driver;

        setDriver(myDriver);
        setName(myDriver.name || '');
        setPhone(myDriver.phone || '');
        setEmail(myDriver.email || '');
        setIsAvailable(myDriver.isAvailable || false);
        setLatitude(myDriver.currentLocation?.lat || '');
        setLongitude(myDriver.currentLocation?.lng || '');
        setAddress(myDriver.currentLocation?.address || '');
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
      await axios.put(`http://localhost:8090/api/v1/driver/update/${driver._id}`, {
        name,
        phone,
        email,
        isAvailable,
        currentLocation: {
          lat: latitude,
          lng: longitude,
          address: address,
        },
      });

      alert('Driver details updated successfully!');
    } catch (err) {
      console.error('Error updating driver:', err);
      alert('Error updating driver.');
    }
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.sidebar}>
        <button style={{ ...styles.sidebarBtn, ...styles.activeBtn }}>My Profile</button>
        <button style={styles.sidebarBtn}>Delivery Requests</button>
        <button style={styles.sidebarBtn}>Tracking Updates</button>
        <button style={styles.sidebarBtn}>Delivery History</button>
        <button style={{ ...styles.sidebarBtn, ...styles.logoutBtn }}>Logout</button>
        <div>
          <img
            style={styles.sidebarImage}
            src="https://img.freepik.com/free-vector/delivery-service-concept-illustration_114360-2606.jpg"
            alt="Delivery"
          />
        </div>
      </div>

      <div style={styles.detailsSection}>
        <h1>My Details</h1>
        <form style={styles.detailsForm} onSubmit={handleUpdate}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Name</label>
            <input
              type="text"
              style={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Phone</label>
            <input
              type="text"
              style={styles.inputField}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email</label>
            <input
              type="email"
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Removed Password Field */}

          <div style={styles.availabilityGroup}>
            <label style={styles.inputLabel}>Are You Available for Delivery?</label>
            <div style={styles.radioGroup}>
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

          <div style={styles.locationSection}>
            <h3>Update Your Current Location</h3>
            <div style={styles.coordinateGroup}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Latitude</label>
                <input
                  type="text"
                  style={styles.inputField}
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Longitude</label>
                <input
                  type="text"
                  style={styles.inputField}
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>

            <div style={{ ...styles.inputGroup, marginTop: '20px' }}>
              <label style={styles.inputLabel}>Address</label>
              <input
                type="text"
                style={styles.inputField}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your current address"
              />
            </div>
          </div>

          <button style={styles.updateBtn} type="submit">
            Update
          </button>
        </form>

        <div style={styles.mapContainer}>
          <iframe
            title="Location Map"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            style={styles.mapIframe}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  profileContainer: {
    display: 'flex',
    minHeight: '50vh',
    backgroundColor: '#e0f7f9',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#b2ebf2',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sidebarBtn: {
    backgroundColor: '#76d7db',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '5px',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activeBtn: {
    backgroundColor: '#00838f',
    color: 'white',
  },
  logoutBtn: {
    marginTop: '20px',
    backgroundColor: '#76d7db',
  },
  sidebarImage: {
    width: '100%',
    marginTop: '20px',
  },
  detailsSection: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#fff',
  },
  detailsForm: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  inputField: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  availabilityGroup: {
    gridColumn: 'span 2',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    marginTop: '5px',
  },
  locationSection: {
    gridColumn: 'span 2',
    marginTop: '20px',
  },
  coordinateGroup: {
    display: 'flex',
    gap: '20px',
  },
  updateBtn: {
    gridColumn: 'span 2',
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#00838f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mapContainer: {
    marginTop: '20px',
  },
  mapIframe: {
    width: '100%',
    height: '300px',
    border: 'none',
    borderRadius: '8px',
  },
};

export default DriverDashboard;
