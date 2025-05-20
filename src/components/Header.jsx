import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { appRoutes } from "../../appRoutes";

const Header = () => {
  return (
    <header className={`${styles.header} shadow-lg fixed-top`}>
      {" "}
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
          <Link
            to={appRoutes.Home}
            className="navbar-brand"
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#ff4757",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="fas fa-utensils me-2"></i>{" "}
            <FontAwesomeIcon icon={faUtensils} className="me-2" />
            Foodie
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-auto "
              style={{
                color: "#333",
                fontWeight: "500",
                transition: "color 0.3s",
              }}
            >
              <li className="nav-item H-nav-item">
                <Link
                  className={`${styles.navLink} nav-link`}
                  to={appRoutes.Home}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item H-nav-item">
                <Link className="nav-link" to={appRoutes.Restaurant}>
                  Restaurants
                </Link>
              </li>
              <li className="nav-item H-nav-item">
                <Link className="nav-link" to={appRoutes.About}>
                  About us
                </Link>
              </li>
            </ul>
            <div
              className={`${styles.authButtons} ms-lg-3 mt-3 mt-lg-0 d-flex gap-2 align-items-center`}
            >
              <Link to={appRoutes.Login} className={`${styles.loginLink} me-3`}>
                Login
              </Link>
              <Link
                to={appRoutes.Register}
                className={`${styles.signupButton} btn btn-danger rounded-pill`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
