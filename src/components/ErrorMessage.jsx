import PropTypes from "prop-types";

const ErrorString = ({ message }) => {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
      <p>Please try refreshing the page.</p>
    </div>
  );
};

ErrorString.propTypes = {
  message: PropTypes.string.isRequired,
};

ErrorString.defaultProps = {
  message: "An unexpected error occurred. We are looking into it.",
};

export default ErrorString;
