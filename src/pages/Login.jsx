import axios from "axios";
import { useState } from "react";
import { appRoutes } from "../../appRoutes";
import { useNavigate, Link } from "react-router-dom";
import {
  logincontainerStyle,
  loginContainerStyle,
  loginformTitleStyle,
  loginformLabelStyle,
  logininputGroupTextStyle,
  loginpasswordRequirementsStyle,
  loginpasswordRequirementValidStyle,
  loginpasswordRequirementInvalidStyle,
  loginbtnPrimaryStyle,
  loginbtnPrimaryHoverStyle,
  loginspinnerBorderStyle,
  loginalertStyle,
  loginInputGroupTextStyle,
  logininputStyle,
} from "../styles/LoginPage";

const Login = () => {
  // DECLARING STATES TO MANAGE PASSWORD AND EMAIL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Update requirements
    setRequirements({
      length: /.{6,}/.test(value),
      lowercase: /(?=.*[a-z])/.test(value),
      uppercase: /(?=.*[A-Z])/.test(value),
      number: /(?=.*\d)/.test(value),
      special: /(?=.*[@$!%*?&])/.test(value),
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // COMPILING FORM DATA
    const formData = {
      email,
      password,
    };
    try {
      // SENDING FORM DATA TO SERVER
      const response = await axios.post(appRoutes.PostLoginUrl, formData);

      if (response.data.success) {
        setShowError(false);
        setErrorMessage("");
        setShowSuccess(true);
        setShowError(false);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          response.data.role === "restaurant"
            ? navigate(appRoutes.RestaurantDashboard)
            : navigate(appRoutes.CustomerDashboard);
        }, 1500);
      }
    } catch (error) {
      setShowError(true);
      setShowSuccess(false);
      setErrorMessage(error.response?.data?.message || "Login failed");
      console.error(error.message);
    }
  };
  return (
    <div style={logincontainerStyle} className="container logincontainerStyle">
      <div style={loginContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h2 style={loginformTitleStyle} className="loginformTitleStyle">
            Account Login
          </h2>{" "}
          <hr
            style={{
              color: "purple",
              border: "none",
              borderRadius: "50px",
              height: "5px",
              backgroundColor: "red",
              opacity: 0.7,
            }}
          />{" "}
          <br />
          {/* EMAIL CONTAINER */}
          <div className="mb-4">
            <label htmlFor="email" style={loginformLabelStyle}>
              Email <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span
                style={loginInputGroupTextStyle}
                className="input-group-text"
              >
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Please enter a valid email"
                className="form-control focus rounded-pill"
                style={logininputStyle}
              />
            </div>{" "}
            <br />
          </div>
          {/* PASSWORD CONTAINER */}
          <div className="mb-4">
            <label htmlFor="password" style={loginformLabelStyle}>
              Password <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span
                style={logininputGroupTextStyle}
                className="input-group-text"
              >
                <i className="bi bi-lock-fill  fs-4"></i>
              </span>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
                value={password}
                required
                placeholder="Please enter a valid password"
                className="form-control focus rounded-pill"
                style={logininputStyle}
              />
            </div>{" "}
            <br />
            {/* Password requirements */}
            <div style={loginpasswordRequirementsStyle}>
              <div
                style={
                  requirements.length
                    ? loginpasswordRequirementValidStyle
                    : loginpasswordRequirementInvalidStyle
                }
              >
                <i
                  className={`bi ${
                    requirements.length ? "bi-check-circle" : "bi-x-circle"
                  }`}
                ></i>{" "}
                At least 6 characters
              </div>
              <div
                style={
                  requirements.lowercase
                    ? loginpasswordRequirementValidStyle
                    : loginpasswordRequirementInvalidStyle
                }
              >
                <i
                  className={`bi ${
                    requirements.lowercase ? "bi-check-circle" : "bi-x-circle"
                  }`}
                ></i>{" "}
                At least one lowercase letter
              </div>
              <div
                style={
                  requirements.uppercase
                    ? loginpasswordRequirementValidStyle
                    : loginpasswordRequirementInvalidStyle
                }
              >
                <i
                  className={`bi ${
                    requirements.uppercase ? "bi-check-circle" : "bi-x-circle"
                  }`}
                ></i>{" "}
                At least one uppercase letter
              </div>
              <div
                style={
                  requirements.number
                    ? loginpasswordRequirementValidStyle
                    : loginpasswordRequirementInvalidStyle
                }
              >
                <i
                  className={`bi ${
                    requirements.number ? "bi-check-circle" : "bi-x-circle"
                  }`}
                ></i>{" "}
                At least one number
              </div>
              <div
                style={
                  requirements.special
                    ? loginpasswordRequirementValidStyle
                    : loginpasswordRequirementInvalidStyle
                }
              >
                <i
                  className={`bi ${
                    requirements.special ? "bi-check-circle" : "bi-x-circle"
                  }`}
                ></i>{" "}
                At least one special character (@$!%*?&)
              </div>
            </div>
          </div>{" "}
          <br />
          {/* ALERTS */}
          {showSuccess && (
            <div
              className="alert alert-success d-flex align-items-center"
              style={loginalertStyle}
              role="alert"
            >
              <i className="bi bi-check-circle-fill me-2"></i>
              <div>Login successful!</div>
            </div>
          )}
          {showError && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              style={loginalertStyle}
              role="alert"
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                  <strong>Oh snap! Login failed.</strong>
                  <div>{errorMessage}</div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowError(false)}
                aria-label="Close"
              ></button>
            </div>
          )}
          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn text-light w-100"
            style={loginbtnPrimaryStyle}
            onMouseOver={(e) =>
              Object.assign(e.target.style, loginbtnPrimaryHoverStyle)
            }
            onMouseOut={(e) => {
              e.target.style.backgroundColor =
                loginbtnPrimaryStyle.backgroundColor;
              e.target.style.borderColor = loginbtnPrimaryStyle.borderColor;
              e.target.style.transform = "none";
              e.target.style.boxShadow = "none";
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                style={loginspinnerBorderStyle}
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <i className="bi bi-box-arrow-in-right me-2 bg-none text-light"></i>
            Login
          </button>
        </form>
        {/* SIGN UP LINK */}
        <div className="text-center mt-3">
          <small className="text-muted">
            Do not have an account?{" "}
            <Link to={appRoutes.Register} className="text-primary fw-bold">
              Register here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
