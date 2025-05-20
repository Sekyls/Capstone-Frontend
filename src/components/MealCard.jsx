import PropTypes from "prop-types";

const formatPrice = (price) => {
  return typeof price === "number" ? `GH₵${price.toFixed(2)}` : "N/A";
};

const MealCard = ({ meal, onOrder }) => {
  const handleOrderClick = () => {
    if (meal.isAvailable && onOrder) onOrder(meal);
  };

  return (
    <div className="col">
      <div
        className={`card h-100 shadow-sm ${
          !meal.isAvailable ? "border-danger" : ""
        }`}
      >
        <img
          src={meal.imageUrl}
          className="card-img-top"
          alt={meal.name}
          style={{ objectFit: "cover", height: "180px" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{meal.name}</h5>
          <p className="text-muted flex-grow-1">{meal.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold text-danger">
              {formatPrice(meal.price)}
            </span>
            {meal.category && (
              <span className="badge bg-black p-2">{meal.category}</span>
            )}
          </div>
          <button
            className="btn btn-success mt-auto"
            disabled={!meal.isAvailable}
            onClick={handleOrderClick}
          >
            {meal.isAvailable ? "Order" : "Unavailable"}
          </button>
        </div>
        {!meal.isAvailable && (
          <div className="card-img-overlay d-flex justify-content-center align-items-center bg-light bg-opacity-75">
            <span className="badge bg-danger fs-6">Unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    isAvailable: PropTypes.bool,
  }).isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default MealCard;
