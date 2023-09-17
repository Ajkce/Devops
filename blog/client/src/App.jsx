import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <h1 className="font-bold text-4xl text-center mt-5">Create Post</h1>
      <PostCreate></PostCreate>
      <hr />
      <div>Posts</div>
      <PostList></PostList>
    </div>
  );
};

export default App;
