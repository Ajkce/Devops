import axios from "axios";
import { useState, useEffect } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);


  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const rendercomments = comments.map((comment) => (
    <li key={comment.id}>{comment.comment}</li>
  ));
  return <ul className="px-4 text-gray-600">{rendercomments}</ul>;
};

export default CommentList;
