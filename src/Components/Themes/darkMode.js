import { createTheme } from "@mui/material";

export const darkMode = createTheme({
    palette : {
        mode: "dark",
            primary: {
                main: "#008394" 
            },
            secondary: {
                main: "#00a0b2"
            },
            background: {
                default: '#2d2d2d',
            },
    }
})