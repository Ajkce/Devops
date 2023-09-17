import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTite] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTite("");
  };

  return (
    <div className="mx-5 ">
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title:</label>
          <input
            value={title}
            onChange={(e) => setTite(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="flex items-center w-full">
          <button className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
