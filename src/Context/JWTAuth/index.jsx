import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import {useState, useEffect, useCallback} from 'react';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

export const LoginContext = React.createContext();

const LoginProvider =(props) => {

  const [state, setState] = useState({
    loggedIn: false,
    user: { capabilities: [] },
    error: null,
  });

  // if it includes the capability that is passsed into the can function in the capabilities array in my user object in state, return that capability
  // as a user, if i 'can' do these abilities, I am able to do so.
  const can = (capability) => {
    return state?.user?.capabilities?.includes(capability);
  }
  // has to be declared before it is called when using an arrow function. Does not get hoisted up when you call unlike making it a function validateToken() {}
  const validateToken = useCallback((token) => {
    console.log(token)
    //token that is passed in is the jwt_token
    try {
      let validUser = jwt_decode(token);
        console.log(validUser)
        // validUser is the object that is decoded from the token
        // {name: 'User', role: 'user', capabilities:"[read]", iat:1516239022} (iat is issued at time for jwt payload)
        // set the loginState to true, with the token and the object
      setLoginState(true, token, validUser);
    }
    catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }
  
  },[]);

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    setState({ token, loggedIn, user, error: error || null });
  };
  // logout clears it out, loggedIn is false, token is null, and user object is cleared.
  const logout = () => {
    setLoginState(false, null, {});
  };

  // all three variables are coming from the state for login
  const login = async (username, password) => {
    let { loggedIn, token, user } = state;
    let auth = testUsers[username];
  
    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  }

  useEffect(() =>{
    // This useEffect will check if it has a username, do I have a query string that I can get a token from. 
    if (state.user.name) return;
    // query string will parse the query string of the URL.
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, [state.user.name, validateToken]);

  // componentDidMount() {
  //   const qs = new URLSearchParams(window.location.search);
  //   const cookieToken = cookie.load('auth');
  //   const token = qs.get('token') || cookieToken || null;
  //   this.validateToken(token);
  // }


    return (
      <LoginContext.Provider value={{...state, can: can, login:login, logout:logout }}>
        {props.children}
      </LoginContext.Provider>
    );
}

export default LoginProvider;