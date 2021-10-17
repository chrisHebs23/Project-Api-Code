import "./App.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUsername] = useState(null);
  const pathName = window.location.pathname;

  useEffect(() => {
    axios.get("/auth/").then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        setUsername(response.data.user.username);
        setLoggedIn(true);
      } else {
        console.log("Get user: no user");

        setUsername(null);
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {pathName === "/signup" || pathName === "/login" ? (
        <></>
      ) : (
        <Header
          user={userName}
          setUser={setUsername}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      )}

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/products" component={Products} />
        <Route path="/login">
          <Login
            userName={userName}
            setUsername={setUsername}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>

        <Route path="/signup">
          <Signup
            userName={userName}
            setUsername={setUsername}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
