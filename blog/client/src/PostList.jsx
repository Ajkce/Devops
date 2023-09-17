import axios from "axios";
import { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card w-[30%] mb-5" key={post.id}>
        <div className="card-body">
          <h3 className="font-bold ">{post.title}</h3>
        </div>
        <CommentList postId={post.id}></CommentList>
        <CommentCreate postId={post.id}></CommentCreate>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-between flex">
      {renderedPosts}
    </div>
  );
};

export default PostList;
