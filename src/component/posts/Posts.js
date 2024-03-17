import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Posts.css";
import { useThemeContext } from "../../hook/useThemeContext";

const Posts = ({ item }) => {
  const navigate = useNavigate();
  const passPost = () => {
    navigate(`/showpost/${item.id}`, { state: item });
  };
  const { theme } = useThemeContext();
  return (
    <div className="container">
      <div className={`card  ${theme}card`}>
        <h5 className="card-header">
          <span>{item.title}</span>
          <small>
            <i>
              {item.createdAt && moment(item.createdAt.toDate()).calendar()}
            </i>
          </small>
        </h5>
        <div className="card-body">
          <p className="card-text">
            {item.body.length <= 55
              ? item.body
              : `${item.body.slice(0, 55)}...`}
          </p>
          <pre>by {item.username}</pre>
          <button onClick={passPost} className="btn ">
            More
          </button>
        </div>
      </div>
      {!item && <p>No Post..</p>}
    </div>
  );
};

export default Posts;
