import Auth from "./Components/auth/Auth.jsx";
import Login from "./Components/auth/Login.jsx";
import LoginContext from "./Components/auth/Context.jsx";

const App = () => {
  return (
    <LoginContext>
      <Login />

      <Auth>
        <div>Any valid user can see this</div>
      </Auth>

      <Auth capability="create">
        <div>Users with create access can see this</div>
      </Auth>

      <Auth capability="update">
        <div>Users with update access can see this</div>
      </Auth>

      <Auth capability="delete">
        <div>Users with delete access can see this</div>
      </Auth>
    </LoginContext>
  );
};

export default App;