import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();
  // const [errors, setErrors] = useState("");
  const { userName, loggedIn, setUsername, setLoggedIn } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log(userName);

    axios
      .post("/auth/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          setUsername(response.data.username);
          setLoggedIn(true);

          history.push("/");
        }
      })
      .catch((error) => {
        console.log("Login error: ");
        console.log(error);
      });
  };

  return (
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-col-md-6 text-center mb-5">
            <h2 style={{ fontSize: "2.5rem", color: "#fff" }}>Login</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-1">
              <form
                class="signin-form"
                onSubmit={handleSubmit}
                style={{ maxWidth: "350px", margin: "auto" }}
              >
                <div class="form-group ">
                  <input
                    type="text"
                    placeholder="Username"
                    class="form-control content-center"
                    name="username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary submit px-3"
                  >
                    Submit
                  </button>
                </div>
                <div class="form-group">
                  <p style={{ color: "#fff", fontSize: "1rem" }}>
                    Dont have an account?{" "}
                    <a href="/signup" style={{ color: "#fff" }}>
                      Signup
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
