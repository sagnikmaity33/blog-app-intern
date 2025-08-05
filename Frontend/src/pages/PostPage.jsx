import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert("Post deleted successfully.");
        navigate("/");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post.");
    }
  };

  if (!postInfo) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-2">{postInfo.title}</h1>
          <div className="text-muted mb-2">
            <span>{format(new Date(postInfo.createdAt), "d MMM yyyy HH:mm a")}</span> &nbsp;|&nbsp;
            <span>by <strong>@{postInfo.author.username}</strong></span>
          </div>

         
          {userInfo?.id === postInfo.author._id && (
            <div className="d-flex justify-content-center gap-3 mb-3">
              <Link
                to={`/edit/${postInfo._id}`}
                className="btn btn-primary btn-sm d-flex align-items-center gap-1"
              >
                <FiEdit /> Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                onClick={handleDelete}
              >
                <MdDelete /> Delete
              </button>
            </div>
          )}

        
          <div className="text-center my-4">
            <img
              src={`http://localhost:8000/${postInfo.cover}`}
              className="img-fluid rounded shadow"
              alt="post cover"
            />
          </div>

        
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </div>
      </div>
    </div>
  );
}
