import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const { user, loggedIn, setLoggedIn, setUser } = props;
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    console.log("logging out");

    axios
      .get("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser(null);
          setLoggedIn(false);

          history.push("/");
        }
      })
      .catch((error) => {
        console.log("Logout error: ");
        console.log(error);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>

      <Link to="/products">Products</Link>

      <Link to="/users">Users</Link>

      {loggedIn ? (
        <div>
          <Link to="/">{user}</Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
