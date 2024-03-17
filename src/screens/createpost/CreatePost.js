import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Createpost.css";
import { useFirestore } from "../../hook/useFirestore";
import { useAuthContext } from "../../hook/useAuthcontext";
import { AuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../hook/useThemeContext";

const CreatePost = () => {
  const [createdpost, setCreatedpost] = useState({
    title: "",
    body: "",
    username: "",
  });
  const { addDocument } = useFirestore("posts");
  const [fieldValid, setFieldValid] = useState(null);
  const [showsuccess, setShowsuccess] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const state = useContext(AuthContext);
  const { theme } = useThemeContext();
  const submitHandle = async (e) => {
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
    setShowsuccess("Created succesfully !");
    addDocument(createdpost);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div>
      <div className={`container  ${theme}form`}>
        <form onSubmit={submitHandle}>
          <div className="form-group">
            <label htmlFor="title">Tittle</label>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={(e) =>
                setCreatedpost({
                  ...createdpost,
                  title: e.target.value,
                  userId: user.uid,
                })
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
                setCreatedpost({
                  ...createdpost,
                  body: e.target.value,
                  username: state.user.email.split("@")[0],
                })
              }
              value={createdpost.body}
            ></textarea>
          </div>
          <br />
          <div>
            <button className=" btn create-btn" type="submit">
              Create
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

export default CreatePost;
