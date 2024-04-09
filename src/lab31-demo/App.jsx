// import React from 'react';
import { useState,createContext } from 'react';
import Header from "./Components/Header/Header";

//important to note that you need to export UserContext object for it to be accessed to App.jsx children components
// export const UserContext = React.createContext();

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState({name: "", address: ""});
  return (
    // you don't necessarily need to provide an initial value in the createContext(), however, you do need to provide a starting value in the UserContext.Provider
    <UserContext.Provider value={{user, setUser}}>
      <Header />
      </UserContext.Provider>
  )
}

export default App