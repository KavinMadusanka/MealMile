import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 6.9271,
  lng: 79.8612,
};

const RestaurantRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contactNumber: '',
    role: '2',
    lat: null,
    lng: null,
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
    }));
    setMarkerPosition({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit clicked');

    if (formData.lat === null || formData.lng === null) {
      toast.error('Please click on the map to select your location.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8086/api/v1/auth/register', {
        ...formData,
        role: 2,
      });

      console.log('awaaaa');
      console.log(res.data);
      if (res.data.success) {
        navigate('/loginpage');
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!!!');
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="header">Restaurant Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="input-field"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-field"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            onChange={handleChange}
            required
            className="input-field"
          />

          {/* Google Map */}
          <LoadScript googleMapsApiKey="AIzaSyBgBbw-VnWQAriox72BrPyJRyIj0qIpuOc">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick} // click event here
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>
          <br/>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>

      <style>
        {`
          .container {
            max-width: 600px;
            margin: 50px auto;
          }

          .header {
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: bold;
          }

          .input-field {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
          }

          .input-field:focus {
            border-color: #BF3131;
            outline: none;
          }

          .login-button {
            padding: 12px;
            font-size: 16px;
            background-color: #BF3131;
            color: #EEEEEE;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            width: 100%;
          }

          .login-button:hover {
            background-color: #7D0A0A;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          /* Adding header and footer margins */
          .layout {
            margin-top: 30px;
            margin-bottom: 30px;
          }

          .footer {
            padding: 20px;
            background-color: #f8f8f8;
            text-align: center;
          }
        `}
      </style>
    </Layout>
  );
};

export default RestaurantRegistration;
