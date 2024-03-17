import React, { useState } from "react";
import Header from "./component/header/Header";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./screens/home/Home";
import CreatePost from "./screens/createpost/CreatePost";
import Profile from "./screens/profile/Profile";
import Showpost from "./screens/showpost/Showpost";
import Editpost from "./screens/editpost/Editpost";
import RegisterForm from "./screens/registerform/RegisterForm";
import LoginForm from "./screens/loginform/LoginForm";
import { useAuthContext } from "./hook/useAuthcontext";
import { useThemeContext } from "./hook/useThemeContext";

const App = () => {
  const { user, isAuthReady } = useAuthContext();
  const { theme } = useThemeContext();
  return (
    <div className={`${theme}body`}>
      <Header />
      {isAuthReady && (
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/post"
            element={user ? <CreatePost /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/showpost/:id"
            element={user ? <Showpost /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/editpost/:id"
            element={user ? <Editpost /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/Login"
            element={!user ? <LoginForm /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterForm /> : <Navigate to={"/login"} />}
          />
          <Route
            path="*"
            element={
              <div id="center">
                <img
                  src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=996&t=st=1688481550~exp=1688482150~hmac=7d9240ef2dd237fd8ce433455222cb295b50c761e7dc2c8f667dbfe74f623df8"
                  alt="404"
                  id="notfound"
                />
              </div>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
