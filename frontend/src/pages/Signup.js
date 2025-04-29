import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contactNumber: '',
    isDriver: false, // Track if the user wants to be a driver
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleNavigate = () => {
    navigate('/RestaurantRegistration');
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Always send role 3
      const response = await axios.post('http://localhost:8086/api/v1/auth/register', {
        ...formData,
        role: 3, // Always send role as 3
      });
      if (response.data.success) {
        navigate('/loginpage');
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error during signup. Please try again.');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    formDiv: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      marginBottom: '5px',
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Signup</h2>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formDiv}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formDiv}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formDiv}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formDiv}>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formDiv}>
            <label style={styles.label}>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Checkbox for "isDriver", this is for tracking but not needed for backend */}
          <div style={styles.formDiv}>
            <label>
              <input
                type="checkbox"
                name="isDriver"
                checked={formData.isDriver}
                onChange={handleChange}
              />
              {' '}
              Register as Driver
            </label>
          </div>

          <div className="buttonContainer">
            <button type="submit" className="login-button">Signup</button>
          </div>
        </form>
        <br/>
        <div>
            <p onClick={handleNavigate} style={{ cursor: 'pointer', color: '#7D0A0A' }}>
               <u> You want to register as a Restaurant. Click here.</u>
            </p>
        </div>
      </div>

      <style>
        {`
          .login-button {
            padding: 10px 30px;
            font-size: 16px;
            background-color: #BF3131;
            color: #EEEEEE;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }

          .login-button:hover {
            background-color: #7D0A0A;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          .buttonContainer {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Signup;
