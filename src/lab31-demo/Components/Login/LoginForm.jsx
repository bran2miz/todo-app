// import React from 'react';
import { Modal,Box, Typography, TextField, Button } from '@mui/material';
import { useState, useContext } from 'react';
// exported UserContext as an object, needs to be wrapped in curly brackets. 
import {UserContext} from "../../App";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LoginForm = ({open, handleClose}) => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const {setUser} = useContext(UserContext);

    const handleLogin = () => {
        if (!name || !address) return console.log("missing data");
        setUser({name, address})
    }
    const handleChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        // console.log(value,id);
        if (id === "address") {
            setAddress(value);
        } else if (id === "name") {
            setName(value);
        }
    }

  return (
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
      Enter Your User Information
    </Typography>
    <TextField fullWidth id="name" label="Name" value={name} variant="outlined" onChange={handleChange} style={{marginBottom: "8px"}} />
    <TextField value={address}fullWidth id="address" label="Address" variant="outlined" onChange={handleChange} style={{marginBottom: "8px"}} />
    <Button fullWidth variant="contained" onClick={handleLogin}>Log In</Button>
  </Box>
</Modal>
  )
}

export default LoginForm