// import React from "react";
import { Typography } from "@mui/material";

const Header = ({incomplete}) => {
    return (
        <header data-testid="todo-header">
        <Typography variant="h2" gutterBottom data-testid="todo-h3">To Do List: {incomplete.length} items pending</Typography>
      </header>
    )
}

export default Header;