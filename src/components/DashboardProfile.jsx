import PropTypes from "prop-types";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const DashboardProfile = ({
  name,
  email,
  phone,
  address,
  role,
  createdAt,
  totalOrders,
  completedOrders,
  pendingOrders,
}) => {
  const userInitial = name ? name.charAt(0).toUpperCase() : "U";
  const displayName = name || "User";
  const displayRole = role ? role.toUpperCase() : "N/A";

  return (
    <>
      <h2 className="mb-4">Welcome, {displayName}</h2>

      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h1 className="display-4">User Dashboard</h1>
            <p className="text-muted">Manage your account information</p>
          </div>
        </div>

        <div className="row">
          {/* Profile Card */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <span className="text-white display-4">{userInitial}</span>
                  </div>
                </div>
                <h3>{displayName}</h3>
                <span
                  className={`badge ${
                    role === "customer" ? "bg-info" : "bg-warning"
                  } mb-3`}
                >
                  {displayRole}
                </span>
                <p className="text-muted mb-1">
                  Member since {formatDate(createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">Account Details</h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Full Name</h6>
                      <p className="lead">{displayName}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Email Address</h6>
                      <p className="lead">{email || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="text-muted">Phone Number</h6>
                      <p className="lead">{phone || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-muted">Address</h6>
                  <p className="lead">{address || "N/A"}</p>
                </div>

                {/* <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-primary me-2"
                    onClick={onEditProfile}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={onChangePassword}
                  >
                    Change Password
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row mt-5 mb-4">
          {" "}
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Orders</h5>
                <p className="card-text display-6">{totalOrders}</p>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Completed Orders</h5>
                <p className="card-text display-6">{completedOrders}</p>{" "}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Pending Orders</h5>
                <p className="card-text display-6">{pendingOrders}</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  role: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  totalOrders: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  completedOrders: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pendingOrders: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   onEditProfile: PropTypes.func,
  //   onChangePassword: PropTypes.func,
};

DashboardProfile.defaultProps = {
  name: "User",
  email: "N/A",
  phone: "N/A",
  address: "N/A",
  role: "customer",
  createdAt: new Date().toISOString(),
  totalOrders: 0,
  completedOrders: 0,
  pendingOrders: 0,
  //   onEditProfile: () => console.log("Edit Profile clicked"),
  //   onChangePassword: () => console.log("Change Password clicked"),
};

export default DashboardProfile;
