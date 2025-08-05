import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {posts.length > 0 &&
          posts.map((post) => (
            <div className="col-md-4 d-flex" key={post._id}>
              <Post {...post} />
            </div>
          ))}
      </div>
    </div>
  );
}
