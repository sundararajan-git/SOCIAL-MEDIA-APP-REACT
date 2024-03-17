import React, { useEffect, useState } from "react";
import "./Editpost.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirestore } from "../../hook/useFirestore";
import { useThemeContext } from "../../hook/useThemeContext";

const Editpost = () => {
  const [createdpost, setCreatedpost] = useState({
    id: 0,
    title: "",
    body: "",
  });
  const loaction = useLocation();
  const { state } = loaction;
  const navigate = useNavigate();
  const [fieldValid, setFieldValid] = useState(null);
  const [showsuccess, setShowsuccess] = useState(null);
  const { updateDocument } = useFirestore("posts");
  useEffect(() => {
    if (state) {
      setCreatedpost({ title: state.title, body: state.body });
    }
  }, [state]);
  const submitHandle = (e) => {
    e.preventDefault();
    setFieldValid(null);
    if (!createdpost.title) {
      setFieldValid("Title should not be empty");
      return;
    }
    if (!createdpost.body) {
      setFieldValid("Content should not be empty");
      return;
    }
    setShowsuccess("Update succesfully !");
    updateDocument(state.id, createdpost);
    setTimeout(() => {
      navigate("/");
    }, 800);
  };
  const { theme } = useThemeContext();
  return (
    <div>
      <div className={`container ${theme}form`}>
        <form onSubmit={submitHandle}>
          <div className="form-group">
            <label htmlFor="title">Tittle</label>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={(e) =>
                setCreatedpost({ ...createdpost, title: e.target.value })
              }
              value={createdpost.title}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              id="content"
              rows={5}
              onChange={(e) =>
                setCreatedpost({ ...createdpost, body: e.target.value })
              }
              value={createdpost.body}
            ></textarea>
          </div>
          <br />
          <div>
            <button className="btn create-btn" type="submit">
              Update
            </button>
          </div>
          <br />
          {fieldValid && (
            <div className="alert alert-danger" role="alert">
              {fieldValid}
            </div>
          )}
          {showsuccess && (
            <div className="alert alert-success" role="alert">
              {showsuccess}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Editpost;
