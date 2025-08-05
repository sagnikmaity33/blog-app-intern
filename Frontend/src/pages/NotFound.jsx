import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-3">
        <span className="text-danger">Oops!</span> Page not found.
      </p>
      <p className="lead">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg mt-3">
        Go Home
      </Link>
    </div>
  );
}
