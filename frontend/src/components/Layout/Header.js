import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../../context/auth'; 
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
// import mealMileLogo from '../../assets/logo_white.png'; 

const Header = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // 👈 get the current page path

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:8086/api/v1/auth/Signout');

            localStorage.removeItem('auth');
            Cookies.remove('access_token');
            navigate('/Loginpage');

            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const profileLink = auth?.user
        ? (auth.user.role === 1 ? '/adminProfile' : '/userProfile')
        : '/loginpage';

    // Common button style function
    // inside Header.js

    const buttonStyle = (path) => ({
        color: '#7D0A0A',
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        textDecoration: location.pathname === path ? 'underline' : 'none',
        fontWeight: location.pathname === path ? 'bold' : 'normal',
        paddingBottom: '8px',
        textUnderlineOffset: '6px',
        textDecorationThickness: location.pathname === path ? '3px' : 'auto', // <<== bold underline
        fontSize: '16px',
        '&:hover': {
            textDecoration: 'underline',
        },
        mx: 1,
    });
    
    


    return (
        <AppBar position="static" sx={{ backgroundColor: '#EEEEEE' }}>
            <Toolbar>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    flexGrow: 1, 
                    color: '#7D0A0A', 
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none',
                    fontSize: '28px',
                    fontWeight: 'bold', 
                }}
            >
                MealMile
            </Typography>


                <Button component={Link} to="/" sx={buttonStyle('/')}>
                    Home
                </Button>

                <Button component={Link} to="/about" sx={buttonStyle('/about')}>
                    About Us
                </Button>

                <Button component={Link} to="/cart" sx={buttonStyle('/cart')}>
                    Cart
                </Button>

                {!auth?.user ? (
                    <>
                        <Button component={Link} to="/loginpage" sx={buttonStyle('/loginpage')}>
                            Sign In
                        </Button>
                        <Button component={Link} to="/signup" sx={buttonStyle('/signup')}>
                            Sign Up
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/order" sx={buttonStyle('/order')}>
                            Orders
                        </Button>
                        <Button component={Link} to={profileLink} sx={buttonStyle(profileLink)}>
                            Profile
                        </Button>
                        <Button onClick={handleLogout} sx={{ 
                            color: '#7D0A0A',
                            fontFamily: 'Poppins, sans-serif',
                            textTransform: 'none',
                            '&:hover': {
                            textDecoration: 'underline',
                            },
                            mx: 1,
                        }}>
                            Sign Out
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
