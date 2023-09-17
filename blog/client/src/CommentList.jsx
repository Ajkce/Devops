/* eslint-disable react/prop-types */
const CommentList = ({ comments }) => {
  console.log(comments);

  const rendercomments = comments.map((comment) => {
    let realComment;

    if (comment.status === "approved") {
      realComment = comment.comment;
    }
    if (comment.status === "pending") {
      realComment = "Your comment is currently pending";
    }
    if (comment.status === "rejected") {
      realComment = "This comment has been rejected";
    }
    return <li key={comment.id}>{realComment}</li>;
  });
  return <ul className="px-4 text-gray-600">{rendercomments}</ul>;
};

export default CommentList;
