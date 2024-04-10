import { Typography, Button } from "@mui/material";
import { useContext } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { GlobalContext } from "../../App";

const Header = ({ incomplete }) => {
    const { toggleAppTheme, appTheme } = useContext(GlobalContext);

    const handleThemeClick = () => {
        localStorage.setItem("theme", appTheme === "light" ? "dark" : "light");
        toggleAppTheme();
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#263238", color: "#eceff1", margin: "20px auto", padding: 10, maxWidth: 1000, width: "100%" }}>
            <Typography variant="h4" gutterBottom data-testid="todo-h3">To Do List: {incomplete.length} items pending</Typography>
            <Button onClick={handleThemeClick}>{appTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}</Button>
        </div>
    )
}

export default Header;