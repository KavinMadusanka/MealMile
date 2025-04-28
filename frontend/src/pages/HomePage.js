import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Layout from '../components/Layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();

  // const handleSignOut = async() => {
  //   try {
  //     const res = await axios.post('http://localhost:8086/api/v1/auth/Signout');
      
  //     localStorage.removeItem('auth'); // or whatever key you use
  //     Cookies.remove('access_token'); // remove cookie
  //     navigate('/Loginpage'); // redirect to login page

  //     if(res.data.success){
  //       toast.success(res.data.message);
  //     } else{
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
      
  //   }
  // };
  return (
    <Layout>
    <div>
      <h1>HomePage</h1>
      

      {/* <button onClick={handleSignOut} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Sign Out
      </button> */}

    </div>
    </Layout>
  )
}

export default HomePage