// import React from "react";
import { Typography } from "@mui/material";
import { useContext } from "react";
import {Button} from "@mui/material";
// icon coming from material ui
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { GlobalContext } from "../../App";

const Header = ({incomplete}) => {
    // useContext to grab state from App
    const {toggleAppTheme, appTheme} = useContext(GlobalContext);

    const handleThemeClick = () => {
        localStorage.setItem("theme", appTheme === "light" ? "dark": "light");
        toggleAppTheme();
    }
    return (
        <header data-testid="todo-header" style={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h2" gutterBottom data-testid="todo-h3">To Do List: {incomplete.length} items pending</Typography>
        {/* Button will have an onClick that will trigger a light or dark mode from the opposite of the current mode. Grab the the mode type so that you can switch */}
        <Button onClick={handleThemeClick}>{appTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}</Button>
      </header>
    )
}

export default Header;