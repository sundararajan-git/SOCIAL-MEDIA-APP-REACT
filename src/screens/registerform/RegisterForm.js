import React, { useEffect, useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hook/useAuthentication";

const RegisterForm = () => {
  // eslint-disable-next-line
  const [loginuser, setLoginuser] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [valid, setvalid] = useState(false);
  const navigate = useNavigate();
  const { err, register } = useAuthentication();
  const clickHandle = (e) => {
    e.preventDefault();
    setvalid(true);
    if (form.email && form.password && form.password === form.confirmPassword) {
      register(form);
    }
  };
  return (
    <div>
      <div className="RegisterForm" id="register">
        <form onSubmit={clickHandle} className="form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email..."
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
                username: e.target.value.split("@")[0],
              })
            }
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
          {valid ? (
            form.password ? (
              <pre> </pre>
            ) : (
              <pre id="pre">Please enter your password...</pre>
            )
          ) : (
            <pre> </pre>
          )}
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm-Password..."
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />
          {valid || err ? (
            !form.confirmPassword || form.password !== form.confirmPassword ? (
              <pre id="pre">Please enter your confirmPassword...</pre>
            ) : (
              <pre>{err && err} </pre>
            )
          ) : (
            <pre></pre>
          )}
          <button type="submit" id="register-btn">
            Register
          </button>
          <section>
            You have account ? <Link to="/login">Login</Link>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
