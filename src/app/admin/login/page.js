import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { login } from "../actions";

const ERRORS = {
  invalid: "That email or password is incorrect.",
  locked: "Too many attempts. Please wait 15 minutes and try again.",
  setup: "Login is not set up yet. Add ADMIN_EMAIL and ADMIN_PASSWORD to the environment settings.",
};

export default function LoginPage({ searchParams }) {
  const error = ERRORS[searchParams.error];
  return (
    <div className="adm-login">
      <form className="adm-login-card" action={login}>
        <Image src={logo} alt="Sunrize Tranzit Ltd" priority />
        <h1>Admin Login</h1>
        {error && <div className="adm-note bad" role="alert">{error}</div>}
        <div className="row one">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required autoComplete="username" />
          </div>
        </div>
        <div className="row one">
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required autoComplete="current-password" />
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Log In</button>
      </form>
    </div>
  );
}
