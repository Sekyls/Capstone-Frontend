import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faUtensils,
  faSearch,
  faStar,
  faStarHalfAlt,
  faFilter,
  faSortAmountDown,
  faSortAmountUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { appRoutes } from "../../appRoutes";
import Footer from "../components/Footer";

const Restaurants = () => {
  // State variables
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Fetch restaurants when component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(appRoutes.GetRestaurants);
        console.log("API Response:", response.data); // Debug log

        if (response.data && response.data.success) {
          setRestaurants(response.data.restaurants || []);
        } else {
          setError("Failed to fetch restaurants: Invalid response format");
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        setError(`Failed to fetch restaurants: ${error.message}`);
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();

    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem("favoriteRestaurants");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error("Error parsing saved favorites:", err);
        localStorage.removeItem("favoriteRestaurants");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteRestaurants", JSON.stringify(favorites));
  }, [favorites]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Toggle favorite status for a restaurant
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Toggle showing favorites only
  const toggleFavoritesOnly = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setCurrentPage(1); // Reset to first page when toggling filter
  };

  // Generate random ratings
  const getRandomRating = () => {
    return (Math.floor(Math.random() * 10) + 35) / 10;
  };

  // Check if restaurants is an array before filtering
  const filteredRestaurants = Array.isArray(restaurants)
    ? restaurants.filter((restaurant) => {
        const matchesSearch =
          (restaurant.restaurantName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (restaurant.location || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        if (showFavoritesOnly) {
          return matchesSearch && favorites.includes(restaurant._id);
        }

        return matchesSearch;
      })
    : [];

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortOrder === "asc") {
      return (a.restaurantName || "").localeCompare(b.restaurantName || "");
    } else {
      return (b.restaurantName || "").localeCompare(a.restaurantName || "");
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRestaurants = sortedRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.max(
    1,
    Math.ceil(sortedRestaurants.length / itemsPerPage)
  );

  // Render star ratings
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`full-${i}`}
            icon={faStar}
            className="text-warning"
          />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-warning" />
        )}
        <span className="ms-1 text-muted">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Generate pagination controls
  const renderPaginationControls = () => {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "primary" : "outline-primary"}
            className="mx-1"
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <h3 className="text-muted">Loading restaurants...</h3>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="text-center py-5">
        <div className="alert alert-danger">
          <h4>Oops! Something went wrong</h4>
          <p>{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container
        fluid
        className="restaurant-container"
        style={{
          minHeight: "95vh",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-danger mb-3">
              <FontAwesomeIcon icon={faUtensils} className="me-3" />
              Discover Amazing Restaurants
            </h1>
            <p className="lead text-muted">
              Find the perfect dining experience for any occasion
            </p>
          </div>

          {/* Search and filter controls */}
          <Row className="mb-4">
            <Col lg={8} md={7} sm={12} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text className="bg-danger text-white border-danger">
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by restaurant name or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="shadow-none border-danger"
                />
              </InputGroup>
            </Col>
            <Col lg={4} md={5} sm={12} className="d-flex">
              <Button
                variant={sortOrder === "asc" ? "outline-danger" : "danger"}
                className="me-2 flex-grow-1"
                onClick={toggleSortOrder}
              >
                <FontAwesomeIcon
                  icon={sortOrder === "asc" ? faSortAmountDown : faSortAmountUp}
                  className="me-2"
                />
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
              <Button
                variant={showFavoritesOnly ? "danger" : "outline-danger"}
                className="flex-grow-1"
                onClick={toggleFavoritesOnly}
              >
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Favorites
              </Button>
            </Col>
          </Row>

          {/* Empty state */}
          {currentRestaurants.length === 0 && (
            <div className="text-center py-5 my-4">
              <FontAwesomeIcon
                icon={faFilter}
                className="text-muted mb-3"
                style={{ fontSize: "3rem" }}
              />
              <h3 className="text-muted">No restaurants found</h3>
              <p className="lead">Try adjusting your search criteria</p>
              {showFavoritesOnly && (
                <Button
                  variant="outline-danger"
                  onClick={() => setShowFavoritesOnly(false)}
                >
                  Show All Restaurants
                </Button>
              )}
            </div>
          )}

          {/* Restaurant cards */}
          <Row>
            {currentRestaurants.map((restaurant) => {
              const rating = getRandomRating();
              const isFavorite = favorites.includes(restaurant._id);

              return (
                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  className="mb-4"
                  key={restaurant._id}
                >
                  <Card className="h-100 restaurant-card shadow-sm">
                    <div className="restaurant-image-container">
                      <Card.Img
                        variant="top"
                        src={restaurant.imageUrl}
                        className="restaurant-image"
                        alt={restaurant.restaurantName}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Restaurant+Image";
                        }}
                      />
                      <Button
                        variant={isFavorite ? "warning" : "outline-light"}
                        className="favorite-btn"
                        onClick={() => toggleFavorite(restaurant._id)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </Button>
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="h5 fw-bold">
                          {restaurant.restaurantName}
                        </Card.Title>
                        {renderStarRating(rating)}
                      </div>
                      <Card.Text className="location mb-2">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-danger me-2"
                        />
                        {restaurant.location}
                      </Card.Text>
                      <Card.Text className="text-muted description">
                        {restaurant.description &&
                        restaurant.description.length > 100
                          ? `${restaurant.description.substring(0, 100)}...`
                          : restaurant.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <Button
                        variant="warning"
                        className="w-100 text-light fw-bold"
                      >
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Pagination */}
          {sortedRestaurants.length > itemsPerPage &&
            renderPaginationControls()}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Restaurants;
