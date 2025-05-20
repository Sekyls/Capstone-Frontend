import PropTypes from "prop-types";
import MealCard from "./MealCard";

const MealsGrid = ({ meals, onMealOrder }) => {
  if (!meals.length) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-4">No meals available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} onOrder={onMealOrder} />
        ))}
      </div>
    </div>
  );
};

MealsGrid.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMealOrder: PropTypes.func.isRequired,
};

export default MealsGrid;
