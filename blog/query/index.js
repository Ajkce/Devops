const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = ({ type, data }) => {
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
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent({ type, data });

  res.send({});
});

app.listen(4002, async () => {
  console.log("listening on port 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event :", event.type);
    const { type, data } = event;
    handleEvent({ type, data });
  }
});
