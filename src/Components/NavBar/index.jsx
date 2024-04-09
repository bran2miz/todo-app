// import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <Link to={'/'}>Home</Link>
        <HomeIcon />
        <Link to={'/settings'}>Settings</Link>
        <SettingsIcon />
      </ul>
    </nav>
  );
};

export default NavBar;