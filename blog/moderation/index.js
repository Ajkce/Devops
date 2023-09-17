const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const commentstatus = data.comment.includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: commentstatus,
        comment: data.comment,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("Moderation is listening on port 4003");
});
