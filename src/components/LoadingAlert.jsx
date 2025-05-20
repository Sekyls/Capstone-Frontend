const LoadingAlert = () => {
  return (
    <div className="container mt-4 ">
      <div className="container text-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading Dashboard...</p>
      </div>

      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading meals...</p>
      </div>
    </div>
  );
};

export default LoadingAlert;
