import { useState } from "react";
import Button from "./Button";
import "./Register.css";
import { Wrap } from "./Wrap";

export function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    props.setAccounts((prev) => [
      ...prev,
      {
        fullName: name,
        username: username,
        password: password,
      },
    ]);
    props.onFormSwitch("login");
  };

  return (
    <Wrap
      onClickOutside={() => props.setLoginMenuOpen(false)}
      show={props.loginMenuOpen}
      type="wrap-register"
    >
      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="name">Full Name</label>
          <input
            value={name}
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlfor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            id="username"
            name="username"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <Button type={"submit"} clickCallback={(e) => e}>
            Register
          </Button>
        </form>
        <Button
          type={"register"}
          clickCallback={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
        </Button>
      </div>
    </Wrap>
  );
}
