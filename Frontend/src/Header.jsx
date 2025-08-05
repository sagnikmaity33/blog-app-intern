import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import {
  FaSignInAlt,
  FaUserPlus,
  FaPlusCircle,
  FaSignOutAlt,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log(userInfo);
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  function logout() {
    fetch('http://localhost:8000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-custom border-bottom px-4 py-2">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold text-white d-flex align-items-center"
          to="/"
          style={{
            fontSize: '2rem',
            fontWeight: 'bolder',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <img
            src="/blog-svgrepo-com.svg"
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '10px',
              objectFit: 'contain',
            }}
          />
          Blogger
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <FaInfoCircle className="me-2" />
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                <FaEnvelope className="me-2" />
                Contact Us
              </Link>
            </li>

            {/* Logged in Links */}
            {username && (
              <>
                <li className="nav-item">
                  <Link to="/create" className="nav-link">
                    <FaPlusCircle className="me-2" />
                    Create New Post
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={logout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Logged out Links */}
            {!username && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt className="me-2" />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <FaUserPlus className="me-2" />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
