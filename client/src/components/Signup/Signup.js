import axios from "axios";
import "../Login/Login.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [username, setRegUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { userName, loggedIn, setUsername, setLoggedIn } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sign-up handleSubmit, username: ");
    console.log(username);

    axios
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);

        if (!response.data.errmsg) {
          console.log("Successfully signup");
          setUsername(response.data.username);
          setLoggedIn(true);

          history.push("/");
        }
      })
      .catch((error) => {
        console.log("Register error: ");
        console.log(error);
      });
  };

  return (
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-col-md-6 mb-5">
            <h2 style={{ fontSize: "2.5rem", color: "#fff" }}>Signup</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-1">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    class="form-control"
                    required
                    value={username}
                    onChange={(e) => setRegUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    class="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    class="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="form-control btn btn-primary submit px-3"
                  >
                    Login
                  </button>
                </div>
                <div class="form-group">
                  <p style={{ color: "#fff", fontSize: "1rem" }}>
                    Already have an account?{" "}
                    <a href="/signup" style={{ color: "#fff" }}>
                      Login
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

export default Signup;
