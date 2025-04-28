import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.js'
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:8086/api/v1/auth/login", { email, password });
        if (res && res.data.success) {
                const { token, user, shop, role } = res.data;
    
                // Update auth context with user/shop/admin details
                setAuth({
                    ...auth,
                    token,
                    user,
                    role,  
                });
    
                // Store the token and user/shop/admin details in localStorage
                localStorage.setItem("auth", JSON.stringify({
                    token,
                    user,
                    role
                }));
    
                // Redirect based on role
                if (role === 3) {
                    navigate('/deliveryDashboard');  // Redirect =delic=very drivers to delivery dashboard
                } else {
                    navigate('/');  // Redirect others to homepage
                }
    
                toast.success("Login successful");
        } else {
            toast.error('Invalid email or password ❌');
        }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Login;
