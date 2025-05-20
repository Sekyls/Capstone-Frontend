const ErrorAlert = ({ errorMessage }) => {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
      <p>Please try refreshing the page.</p>
    </div>
  );
};

export default ErrorAlert;
