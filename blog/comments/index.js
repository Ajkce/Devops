const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [];

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[id] || [];

  comments.push({
    id: commentId,
    comment: comment,
  });
  commentsByPostId[id] = comments;
  res.status(201).send(commentsByPostId[id]);
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
