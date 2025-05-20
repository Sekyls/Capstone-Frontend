import axios from "axios";
import { useEffect, useState } from "react";
import { appRoutes } from "../../appRoutes";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Form,
  Button,
  InputGroup,
  Spinner,
  ProgressBar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faLocationDot,
  faUserTag,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // UI state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  // Form State Handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  // Password strength and validation functions
  const getStrengthColor = () => {
    if (passwordStrength <= 20) return "danger";
    if (passwordStrength <= 60) return "warning";
    return "success";
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 20) return "Weak";
    if (passwordStrength <= 60) return "Moderate";
    return "Strong";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password strength
    const requirements = {
      length: /.{6,}/.test(newPassword),
      lowercase: /(?=.*[a-z])/.test(newPassword),
      uppercase: /(?=.*[A-Z])/.test(newPassword),
      number: /(?=.*\d)/.test(newPassword),
      special: /(?=.*[@$!%*?&])/.test(newPassword),
    };
    setPasswordRequirements(requirements);

    // Calculate strength (0-100)
    const strengthScore =
      Object.values(requirements).filter(Boolean).length * 20;
    setPasswordStrength(strengthScore);

    // Password validation using regex
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
    );

    // Only show error if there's input and it doesn't match requirements
    if (newPassword && !passwordRegex.test(newPassword)) {
      setShowError(true);
      setErrorMessage("Password doesn't meet all requirements");
    } else {
      setShowError(false);
    }
  };

  // SUBMITTING FORM DATA
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);

    // VALIDATING FORM DATA BEFORE SUBMISSION
    if (
      !name.trim() ||
      !email.includes("@") ||
      !password ||
      !phone ||
      !address
    ) {
      setValidationError(true);
      return;
    }

    // Clear validation error if all fields are valid
    setValidationError(false);

    // Check password requirements
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
    );

    if (!passwordRegex.test(password)) {
      setShowError(true);
      setErrorMessage("Password doesn't meet all requirements");
      return;
    }

    // Show loading state
    setLoading(true);
    //Compile form Data
    setFormData({
      name,
      email,
      password,
      role,
      phone,
      address,
    });
    setFormSubmitted(true);
  };

  //  useEffect will run when formSubmitted changes to true
  useEffect(() => {
    const registerUser = async () => {
      if (!formSubmitted || !formData) return;

      try {
        console.log(formData);

        const res = await axios.post(appRoutes.PostRegistrationUrl, formData);

        if (res.data.success) {
          setShowSuccess(true);
          setLoading(false);
          setFormSubmitted(false);

          // Reset form
          setName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setAddress("");
          setRole("customer");
          setPasswordStrength(0);
          setPasswordRequirements({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
          });

          // REDIRECTION TO LOGIN PAGE
          setTimeout(() => {
            navigate(appRoutes.Login);
          }, 1500);
        }
      } catch (error) {
        setShowError(true);
        setShowSuccess(false);
        setErrorMessage(error.response?.data?.message || "Registration failed");
        setLoading(false);
        setFormSubmitted(false);
        console.error(error.response?.data?.message || "Registration failed");
      }
    };

    registerUser();
  }, [formSubmitted, formData, navigate]);

  return (
    <div className="container  wrapper-register ">
      <div className="registration-container my-5 p-4 p-md-5  rounded shadow envelope">
        {/* FORM HEADING */}
        <h2 className="text-center mb-5  fw-bold" style={{ color: "red" }}>
          Create Your Account
        </h2>{" "}
        <hr
          style={{
            color: "red",
            opacity: 1,
            border: "none",
            borderRadius: "50px",
            height: "5px",
            backgroundColor: "red",
          }}
        />
        <p className="text-center text-muted mb-4 fw-bold">
          Please fill in all required details to register
        </p>{" "}
        <br />
        <Form onSubmit={handleSubmit} className="form-data">
          <div className="row ">
            {/* NAME FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Name <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    id="nameInput"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Please enter your name"
                    required
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>
              </Form.Group>
            </div>

            {/* EMAIL FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    id="emailInput"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Please enter your email address"
                    required
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>
              </Form.Group>
            </div>

            {/* PHONE FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Phone <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faPhone} />
                  </InputGroup.Text>
                  <Form.Control
                    id="phoneInput"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Please enter your phone number"
                    required
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>
              </Form.Group>
            </div>

            {/* ADDRESS FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Address <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </InputGroup.Text>
                  <Form.Control
                    id="addressInput"
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Please enter your address"
                    required
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>
              </Form.Group>
            </div>

            {/* PASSWORD FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    id="inputPassword"
                    value={password}
                    onChange={handlePasswordChange}
                    name="password"
                    placeholder="Create a strong password"
                    required
                    className="border-start-0 shadow-none"
                  />
                </InputGroup>

                {/* Password strength indicator */}
                <div className="mt-2">
                  <ProgressBar
                    now={passwordStrength}
                    variant={getStrengthColor()}
                    className="mb-1"
                    style={{ height: "8px" }}
                  />
                  <small className={`d-block text-${getStrengthColor()}`}>
                    Password Strength: {getStrengthLabel()}
                  </small>
                </div>

                {/* Password requirements */}
                <div className="password-requirements mt-2">
                  <small
                    className={`d-block ${
                      passwordRequirements.length
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordRequirements.length
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="me-1"
                    />
                    At least 6 characters
                  </small>

                  <small
                    className={`d-block ${
                      passwordRequirements.lowercase
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordRequirements.lowercase
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="me-1"
                    />
                    One lowercase letter
                  </small>

                  <small
                    className={`d-block ${
                      passwordRequirements.uppercase
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordRequirements.uppercase
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="me-1"
                    />
                    One uppercase letter
                  </small>

                  <small
                    className={`d-block ${
                      passwordRequirements.number
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordRequirements.number
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="me-1"
                    />
                    One number
                  </small>

                  <small
                    className={`d-block ${
                      passwordRequirements.special
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordRequirements.special
                          ? faCheckCircle
                          : faTimesCircle
                      }
                      className="me-1"
                    />
                    One special character (@$!%*?&)
                  </small>
                </div>
              </Form.Group>
            </div>

            {/* USER-TYPE FIELD CONTAINER */}
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">
                  Register As <span className="text-danger">*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-danger text-white border-0">
                    <FontAwesomeIcon icon={faUserTag} />
                  </InputGroup.Text>
                  <Form.Select
                    name="role"
                    id="registerAsDropdown"
                    required
                    value={role}
                    onChange={handleRoleChange}
                    className="border-start-0 shadow-none"
                  >
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </div>
          </div>

          {/* SUCCESS ALERT */}
          {showSuccess && (
            <Alert variant="success" className="mt-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2 fs-4" />
              <div>
                <Alert.Heading className="mb-0 fs-5">
                  Registration successful!
                </Alert.Heading>
                <p className="mb-0">
                  Your account has been created. You can now log in.
                </p>
              </div>
            </Alert>
          )}

          {/* ERROR ALERT */}
          {showError && (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
              className="mt-3"
            >
              <p>{errorMessage}</p>
            </Alert>
          )}

          {/* FORM SUBMISSION VALIDATION ERROR ALERT */}
          {validationError && (
            <Alert
              variant="danger"
              onClose={() => setValidationError(false)}
              dismissible
              className="mt-3"
            >
              <Alert.Heading>
                Oh snap! Registration failed. Please try again.
              </Alert.Heading>
              <p>Please fill all fields correctly!</p>
            </Alert>
          )}

          {/* REGISTER BUTTON */}
          <div className="d-flex justify-content-center mt-4">
            <Button
              type="submit"
              variant="danger"
              className="btn-lg px-5 fw-bold register-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Processing...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>

          {/* LOGIN LINK */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to={appRoutes.Login} className="text-primary fw-bold">
                Login here
              </Link>
            </small>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
