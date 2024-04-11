/* eslint-disable react/prop-types */
// import React from 'react';
import {When} from 'react-if';
import { useContext } from 'react';
import { LoginContext } from './Context.jsx';

function Auth (props) {

  const context = useContext(LoginContext);
  // console.log(context);

    const isLoggedIn = context.loggedIn;
    const canDo = props.capability ? context.can(props.capability) : true;
    // canDo is based on capability
    // do they have permission to do the action
    const okToRender = isLoggedIn && canDo;

    return (
      <When condition={okToRender}>
        {props.children}
      </When>
    );
  
}

export default Auth;

