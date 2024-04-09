// import React from 'react';
import { useState } from "react";
import {Button} from "@mui/material";

import LoginForm from "./LoginForm";


//this is the system that updates the state
const LoginButton = () => {

    const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    // setUser({...user, name: "Brandon"})
    setShowModal(true);
};
  return (
    <>
    <LoginForm open={showModal} handleClose={()=> setShowModal(false)}/>
    <Button variant="contained" color="secondary"onClick={handleLogin}>Login</Button>
    </>
  )
}

export default LoginButton;