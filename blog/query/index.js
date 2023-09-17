const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }
  if (type === "CommentUpdated") {
    const { id, postId, comment, status } = data;
    const post = posts[postId];
    const realComment = post.comments.find((comment) => comment.id === id);
    realComment.status = status;
    realComment.comment = comment;
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
