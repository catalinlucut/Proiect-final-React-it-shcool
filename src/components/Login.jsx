import Button from "./Button";
import "./Login.css";
import { Wrap } from "./Wrap";

export function Login({
  setLoginMenuOpen,
  loginMenuOpen,
  onFormSwitch,
  usernameLog,
  setUsernameLog,
  passwordLog,
  setPasswordLog,
  setIsLogged,
  accounts,
  setLoggedUser,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      accounts.map((account) => account.username).includes(usernameLog) &&
      accounts.map((account) => account.password).includes(passwordLog)
    ) {
      // localStorage.setItem("loggedIn", true);
      setIsLogged(true);
      setLoginMenuOpen(false);
      setLoggedUser({
        fullName: accounts.find(
          ({ username, password }) =>
            username === usernameLog && password === passwordLog
        ).fullName,
        username: usernameLog,
        password: passwordLog,
      });
    } else alert("Invalid username or password");
    setUsernameLog("");
    setPasswordLog("");
  };

  return (
    <Wrap
      onClickOutside={() => setLoginMenuOpen(false)}
      show={loginMenuOpen}
      type="wrap-login"
    >
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            value={usernameLog}
            onChange={(e) => setUsernameLog(e.target.value)}
            type="username"
            id="username"
            name="username"
          />
          <label htmlFor="password">Password</label>
          <input
            value={passwordLog}
            onChange={(e) => setPasswordLog(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <Button type={"submit"} clickCallback={(e) => e}>
            Login
          </Button>
        </form>
        <Button
          type={"register"}
          clickCallback={() => onFormSwitch("register")}
        >
          Dont't have an account? Register here.
        </Button>
      </div>
    </Wrap>
  );
}
