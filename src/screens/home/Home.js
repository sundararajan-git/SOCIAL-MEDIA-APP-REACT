import React from "react";
import Posts from "../../component/posts/Posts";
import { useFetchCollection } from "../../hook/useFetchCollection";
import "./Home.css";

const Home = () => {
  const { documents: post, isloading, Err } = useFetchCollection("posts");
  return (
    <div className="home">
      {isloading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {Err && <p>Data is not Recived...</p>}
      {post.map((item) => {
        return <Posts item={item} key={item.id} />;
      })}
    </div>
  );
};

export default Home;
