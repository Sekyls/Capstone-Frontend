import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center ">
            <Link
              to={""}
              className="brand-name d-inline-block mb-3 text-light fw-bold "
            >
              <FontAwesomeIcon icon={faUtensils} className="me-2" /> Foodie
            </Link>
            <p className="text-light">
              Order your favorite meals from the best local restaurants,
              delivered fast and fresh right to your doorstep.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0 text-center">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={""}>
                  <i className="bi bi-house-door-fill"></i>Home
                </Link>
              </li>

              <li>
                <Link to={""}>
                  <i className="bi bi-person-lines-fill"></i>Contact
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <i className="bi bi-question-circle-fill"></i>FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 text-center text-light">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt-fill"></i>123 Foodie Lane, Accra,
                Ghana
              </li>
              <li>
                <i className="bi bi-telephone-fill"></i>+233 12 345 6789
              </li>
              <li>
                <i className="bi bi-envelope-fill"></i>support@foodieapp.com
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 text-center">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="social-icons ">
              <Link to={"#"} aria-label="Facebook" className="bg-light">
                <i className="bi bi-facebook text-primary fw-bold fs-3 m-1  "></i>
              </Link>
              <Link to={"#"} aria-label="Twitter" className="bg-light">
                <i className="bi bi-twitter-x fw-bold fs-3 m-1 text-black"></i>
              </Link>
              <Link to={"#"} aria-label="Instagram" className="bg-light">
                <i className="bi bi-instagram fw-bold fs-3 m-1 text-danger"></i>
              </Link>
              <Link to={"#"} aria-label="LinkedIn" className="bg-light">
                <i className="bi bi-linkedin fw-bold fs-3 m-1 text-primary"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-light fw-bold">
          <span id="current-year">
            {" "}
            <a>&copy; </a>
          </span>{" "}
          {date} Foodie App. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
