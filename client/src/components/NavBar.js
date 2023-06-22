import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Auth from '../utils/auth';

export default function NavBar() {
    const logout = () => {
        Auth.logout();
    };

    const onClick = (e) => {
        if (e.key === 'LogOut') {
            console.log('logout click');
            logout();
        }
    };

    const loggedInItems = [
        {
            label:(<Link to='/' >Home</Link>),
            key:'Home'
        },
        {
            label:(<Link to='/profile' >Profile</Link>),
            key:'Profile'
        },
        {
            label:(<Link to='/' >Log Out</Link>),
            key:'LogOut',
        }
    ];

    const loggedOutItems = [
        {
            label:(<Link to='/' >Home</Link>),
            key:'Home'
        },
        {
            label:(<Link to='/login' >Log In</Link>),
            key:'LogIn'
        },
        {
            label:(<Link to='/signup' >Sign Up</Link>),
            key:'SignUp'
        },
    ];

    return (
        <div>
            { Auth.loggedIn() ?
            <Menu mode='horizontal' items={loggedInItems} onClick={onClick} /> 
            : 
            <Menu mode='horizontal' items={loggedOutItems} />}
          </div>
        
    );
}