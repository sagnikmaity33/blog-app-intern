import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/post/${_id}`}>
        <img
          src={`http://localhost:8000/${cover}`}
          className="card-img-top"
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link to={`/post/${_id}`} className="text-decoration-none text-dark">
          <h5 className="card-title">{title}</h5>
        </Link>
        <p className="card-subtitle mb-2 text-muted small">
          By <strong>{author.username}</strong> ·{" "}
          <time>{format(new Date(createdAt), "d MMM yyyy HH:mm a")}</time>
        </p>
        <p className="card-text">{summary}</p>
      </div>
    </div>
  );
}
