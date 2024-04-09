import React from 'react';
import { Typography } from '@mui/material';
import LoginButton from "../Login/LoginButton";
import { UserContext } from "../../../App";

// this is a system that will handle the state
const Header = () => {
    const {user} = React.useContext(UserContext);
  return (
    <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
        <Typography variant="h3">My Awesome Webpage</Typography>
        {!user.name &&<LoginButton />}
        {user.name && <Typography variant="h5">Welcome {user.name}!</Typography>}
    </div>
  )
}

export default Header