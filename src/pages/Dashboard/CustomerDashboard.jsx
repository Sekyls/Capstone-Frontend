import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import OrderModal from "../../components/OrderModal";
import MyOrders from "../../components/MyOrders";
import LoadingAlert from "../../components/LoadingAlert";
import ErrorAlert from "../../components/ErrorAlert";
import DashboardProfile from "../../components/DashboardProfile";
import MealsGrid from "../../components/MealsGrid";

const ErrorEvent = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
);

const CustomerDashboard = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [meals, setMeals] = useState([]);
  const [mealsError, setMealsError] = useState(false);
  const [mealsErrorMessage, setMealsErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/userauth/me");
        if (response.data.success) {
          setUser(response.data.userDetails);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage(
          "Error fetching user data: " +
            (error.response?.data?.message || "Unknown error")
        );
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosInstance.get("/meals");
        if (response.data.success) {
          setMeals(response.data.meals);
        } else {
          setMealsError(true);
        }
      } catch (error) {
        setMealsError(true);
        setMealsErrorMessage(
          error.response?.data?.message || "Failed to fetch meals."
        );
      }
    };
    fetchMeals();
  }, []);

  const handleOpenOrderModal = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
    console.log("Ordering meal:", meal);
  };

  const handleSubmitOrder = async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      if (response.data.success) {
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong placing your order."
      );
    }
  };

  if (isLoading) return <LoadingAlert />;
  if (errorMessage) return <ErrorAlert errorMessage={errorMessage} />;

  return (
    <div className="container mt-4">
      <DashboardProfile {...user} />
      <MyOrders />
      <div>
        <h2>Today's Menu</h2>
        <MealsGrid meals={meals} onMealOrder={handleOpenOrderModal} />
      </div>
      <OrderModal
        show={showModal}
        onClose={() => setShowModal(false)}
        meal={selectedMeal}
        onSubmitOrder={handleSubmitOrder}
      />
      {mealsError && <ErrorEvent message={mealsErrorMessage} />}
    </div>
  );
};

export default CustomerDashboard;
