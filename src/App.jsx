import { createContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';

// import of CssBaseLine 
import { CssBaseline } from '@mui/material';

// when you get the error, object or component name does not provide an export named 'default' you must wrap it in curly brackets. it needs to be brought into another component as an object. 
import { darkMode } from './Components/Themes/darkMode';
import { lightMode } from './Components/Themes/lightMode';

// import Routes and Routers from react-router-dom for the nav bar
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import  NavBar  from './Components/NavBar/index';



import Todo from './Components/Todo';
import Settings from './Components/Context/Settings/index';

export const GlobalContext = createContext(null);

// Main Content Component
const Home = () => {
    return <Todo />
}

const App = () => {
    // lab 32 - set theme with the default as lightMode
    const [appTheme, setAppTheme] = useState("light");

    // initialize state and then pass it into the GlobalContext.Provider (instead of just adding values to it)

    const [userSettings, setUserSettings] = useState({
        displayCount: 3,
        hideCompleted: true,
        sortWord: 'difficulty'
    });

    //component did mount
    useEffect(()=> {
        const mode = localStorage.getItem("theme");
        setAppTheme(mode);
    }, []);

      return (
        
        <GlobalContext.Provider
          value={{
            userSettings,
            displayCount: userSettings.displayCount,
            hideCompleted: userSettings.hideCompleted,
            sortWord: userSettings.sortWord,
            setUserSettings,
            // toggleAppTheme is a function that will set the app theme to the opposite: if its in lightMode it will switch to darkMode and vice versa. 
            toggleAppTheme: () => setAppTheme(appTheme === "light"? "dark" : "light"),
            // pass in  the state 
            appTheme,
          }}
        >
        <ThemeProvider theme={appTheme === "light"? lightMode: darkMode}>
          <CssBaseline />
          <Router>
            <NavBar />
            <Routes>
                <Route index element={<Home />}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
          </Router>
          {/* <Todo /> */}
          </ThemeProvider>
        </GlobalContext.Provider>
        
      );  
  }
  
export default App;