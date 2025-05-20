import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Invalid Date";
  }
};

const RestaurantDashboard = () => {
  // Name state
  const [name, setName] = useState("");

  // Email state
  const [email, setEmail] = useState("");

  // Role state
  const [role, setRole] = useState("");

  // Phone state
  const [phone, setPhone] = useState("");

  // Address state
  const [address, setAddress] = useState("");

  // CreatedAt state
  const [createdAt, setCreatedAt] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axiosInstance.get("/me");
        if (userData.data && userData.data.success) {
          const { name, role, phone, email, address, createdAt } =
            userData.data.userDetails;
          setName(name || "");
          setRole(role || "");
          setPhone(phone || "");
          setEmail(email || "");
          setAddress(address || "");
          setCreatedAt(createdAt || "");
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        const apiErrorMessage =
          error.response?.data?.message || "Failed to fetch user data";
        setErrorMessage("Error fetching user data: " + apiErrorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Render a loading state while fetching data
  if (isLoading) {
    return (
      <div className="container mt-4 ">
        <div role="alert" className="alert alert-warning container">
          Loading user data...
        </div>
      </div>
    );
  }

  //  Render an error message if fetching failed
  if (errorMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  // Main component render if data is loaded and no error
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome, {name || "User"}</h2>{" "}
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h1 className="display-4">User Dashboard</h1>
            <p className="text-muted">Manage your account information</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <span className="text-white display-4">
                      {name ? name.charAt(0) : "U"}
                    </span>
                  </div>
                </div>
                <h3>{name || "User"}</h3>
                <span
                  className={`badge ${
                    role === "customer" ? "bg-info" : "bg-warning"
                  } mb-3`}
                >
                  {" "}
                  {role ? role.toUpperCase() : "N/A"}
                </span>
                <p className="text-muted mb-1">
                  Member since {formatDate(createdAt)}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">Account Details</h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Full Name</h6>
                      <p className="lead">{name || "N/A"}</p>{" "}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Email Address</h6>
                      <p className="lead">{email || "N/A"}</p>{" "}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Phone Number</h6>
                      <p className="lead">{phone || "N/A"}</p>{" "}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted">Address</h6>
                  <p className="lead">{address || "N/A"}</p>{" "}
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button className="btn btn-primary me-2">Edit Profile</button>
                  <button className="btn btn-outline-secondary">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">--</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Completed Orders</h5>
              <p className="card-text">--</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text">--</p>
            </div>
          </div>
        </div>
      </div>
      {/* Orders Table Placeholder */}
      <div className="card">
        <div className="card-header">Order History</div>
        <div className="card-body">
          <p className="text-muted">No orders yet.</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
