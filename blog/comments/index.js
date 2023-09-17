const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [];

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[id] || [];

  comments.push({
    id: commentId,
    comment: comment,
    status: "pending",
  });
  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      comment: comment,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostId[id]);
});

app.post("/events", async (req, res) => {
  console.log("Recieved Events", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, comment } = data;
    const comments = commentsByPostId[postId];
    const findcomment = comments.find((comment) => comment.id === id);
    findcomment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        comment,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
