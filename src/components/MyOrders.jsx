import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "preparing":
        return "warning";
      case "ready":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mt-5">
      <h3>My Orders</h3>
      <Button variant="secondary" className="mb-3" onClick={fetchOrders}>
        Refresh Orders
      </Button>

      {loading && <Spinner animation="border" />}

      {error && <p className="text-danger">{error}</p>}

      {orders.length === 0 && !loading && <p>No orders found.</p>}

      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 mb-4" key={order._id}>
            <Card>
              <Card.Body>
                <Card.Title>{order.meal.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Quantity:{" "}
                  {order.meal.quantity || order.meal.quantity === 0
                    ? order.meal.quantity
                    : order.quantity}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Total:</strong> ${order.totalPrice.toFixed(2)} <br />
                  <strong>Address:</strong> {order.deliveryAddress} <br />
                  <strong>Notes:</strong> {order.notes || "None"} <br />
                  <strong>Ordered on:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </Card.Text>
                <Badge bg={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
