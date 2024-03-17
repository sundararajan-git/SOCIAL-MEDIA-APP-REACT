import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hook/useAuthentication";

const LoginForm = () => {
  // eslint-disable-next-line
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();
  const { err, logIn } = useAuthentication();
  const clickHandle = () => {
    setvalid(true);
    if (form.email && form.password) {
      logIn(form);
    }
  };
  return (
    <>
      <div className="loginForm">
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email..."
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {valid ? (
            form.email ? (
              <pre> </pre>
            ) : (
              <pre id="pre">Please enter your email...</pre>
            )
          ) : (
            <pre> </pre>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password..."
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {valid || err ? (
            form.password ? (
              <pre>{err ? err : null} </pre>
            ) : (
              <pre id="pre">Please enter your password...</pre>
            )
          ) : (
            <pre> </pre>
          )}
          <button type="submit" id="login-btn" onClick={clickHandle}>
            Login
          </button>
          <section>
            You have account ? <Link to="/register">Register</Link>
          </section>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
