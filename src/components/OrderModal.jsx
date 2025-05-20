import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  X,
  BagCheckFill,
  GeoAltFill,
  PencilSquare,
} from "react-bootstrap-icons";

const OrderModal = ({ show, onClose, meal, onSubmitOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    if (!show) {
      setQuantity(1);
      setDeliveryAddress("");
      setNotes("");
      setAddressError("");
    } else {
      setQuantity(1);
      setDeliveryAddress("");
      setNotes("");
      setAddressError("");
    }
  }, [show, meal]);

  const validateAddress = (address) => {
    if (address.trim().length < 20) {
      setAddressError("Delivery address must be at least 20 characters.");
      return false;
    }
    setAddressError("");
    return true;
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
    if (addressError) {
      validateAddress(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!validateAddress(deliveryAddress)) {
      return;
    }

    const orderData = {
      meal: {
        mealId: meal._id,
        quantity: Number(quantity),
        priceAtOrderTime: meal.price,
      },
      totalPrice: meal.price * quantity,
      deliveryAddress,
      notes,
      isPaid: false,
    };

    onSubmitOrder(orderData);
  };

  const handleClose = () => {
    onClose();
  };

  // --- Styling Constants ---
  const themeColors = {
    primary: "#007bff",
    secondary: "#6c757d",
    lightGray: "#f0f2f5",
    darkText: "#212529",
    mediumText: "#495057",
    danger: "#dc3545",
    success: "#198754",
    modalHeaderBg: "#ffffff",
    modalBodyBg: "#fdfdff",
    modalFooterBg: "#f8f9fa",
    inputBorder: "#ced4da",
    inputFocusBorder: "#86b7fe",
    inputFocusShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
  };

  const modalStyles = {
    header: {
      backgroundColor: themeColors.modalHeaderBg,
      borderBottom: `1px solid ${themeColors.lightGray}`,
      padding: "1.25rem 1.5rem",
    },
    title: {
      color: themeColors.darkText,
      fontWeight: "600",
      fontSize: "1.3rem",
      display: "flex",
      alignItems: "center",
    },
    body: {
      padding: "1.5rem 2rem",
      backgroundColor: themeColors.modalBodyBg,
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    formLabel: {
      fontWeight: "500",
      color: themeColors.mediumText,
      marginBottom: "0.5rem",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
    },
    formControl: {
      borderRadius: "0.375rem",
      borderColor: themeColors.inputBorder,
      padding: "0.75rem 1rem",
      fontSize: "0.95rem",
      transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
    },
    textarea: {
      minHeight: "80px",
    },
    footer: {
      backgroundColor: themeColors.modalFooterBg,
      borderTop: `1px solid ${themeColors.lightGray}`,
      padding: "1rem 1.5rem",
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      padding: "0.65rem 1.5rem",
      fontWeight: "500",
      borderRadius: "0.375rem",
      transition:
        "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.2s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    closeButtonIcon: {
      border: "none",
      background: "transparent",
      fontSize: "1.5rem",
      padding: "0.5rem",
      lineHeight: 1,
      color: themeColors.secondary,
      opacity: 0.7,
    },
    errorText: {
      color: themeColors.danger,
      fontSize: "0.8rem",
      marginTop: "0.25rem",
    },
    charCountText: {
      color: themeColors.mediumText,
      fontSize: "0.8rem",
      marginTop: "0.25rem",
      textAlign: "right",
    },
  };
  // --- End Styling Constants ---

  const isSubmitDisabled = deliveryAddress.trim().length < 20 || !meal;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
      style={{
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Modal.Header style={modalStyles.header} closeButton={false}>
        <Modal.Title style={modalStyles.title}>
          <BagCheckFill
            size={26}
            style={{ marginRight: "12px", color: themeColors.primary }}
          />
          Order: {meal?.name || "Selected Item"}
        </Modal.Title>
        <Button
          variant="icon"
          onClick={handleClose}
          style={modalStyles.closeButtonIcon}
          onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseOut={(e) => (e.currentTarget.style.opacity = 0.7)}
          aria-label="Close"
        >
          <X size={28} />
        </Button>
      </Modal.Header>

      <Modal.Body style={modalStyles.body}>
        {meal?.image && (
          <Row className="mb-4 align-items-center">
            <Col
              xs={12}
              md={3}
              className="text-center text-md-start mb-3 mb-md-0"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: "100px",
                  border: `1px solid ${themeColors.lightGray}`,
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col xs={12} md={9}>
              <h5
                style={{
                  fontWeight: "600",
                  color: themeColors.darkText,
                  marginBottom: "0.25rem",
                }}
              >
                {meal.name}
              </h5>
              {meal.description && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: themeColors.mediumText,
                    marginBottom: "0.5rem",
                  }}
                >
                  {meal.description}
                </p>
              )}
              {typeof meal.price === "number" && (
                <p
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: "bold",
                    color: themeColors.primary,
                  }}
                >
                  ${meal.price.toFixed(2)}
                </p>
              )}
            </Col>
          </Row>
        )}

        <Form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {" "}
          <Form.Group style={modalStyles.formGroup} controlId="orderQuantity">
            <Form.Label style={modalStyles.formLabel}>
              <PencilSquare
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Quantity
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              style={modalStyles.formControl}
              onFocus={(e) =>
                (e.target.style.boxShadow = modalStyles.inputFocusShadow)
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
              disabled={!meal}
            />
          </Form.Group>
          <Form.Group
            style={modalStyles.formGroup}
            controlId="orderDeliveryAddress"
          >
            <Form.Label style={modalStyles.formLabel}>
              <GeoAltFill
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Delivery Address
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={deliveryAddress}
              onChange={handleDeliveryAddressChange}
              onBlur={() => validateAddress(deliveryAddress)}
              placeholder="e.g., 123 Main St, Anytown, State, 12345"
              style={{
                ...modalStyles.formControl,
                ...modalStyles.textarea,
                borderColor: addressError
                  ? themeColors.danger
                  : themeColors.inputBorder,
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = addressError
                  ? `0 0 0 0.25rem rgba(220, 53, 69, 0.25)`
                  : modalStyles.inputFocusShadow)
              }
              onBlurCapture={(e) => (e.target.style.boxShadow = "none")}
              required
              minLength={20}
              disabled={!meal}
              isInvalid={!!addressError}
            />
            {addressError && (
              <Form.Text style={modalStyles.errorText}>
                {addressError}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group style={modalStyles.formGroup} controlId="orderNotes">
            <Form.Label style={modalStyles.formLabel}>
              <PencilSquare
                size={16}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Special Instructions (Optional)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              maxLength={200}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any dietary restrictions or special requests?"
              style={{ ...modalStyles.formControl, ...modalStyles.textarea }}
              onFocus={(e) =>
                (e.target.style.boxShadow = modalStyles.inputFocusShadow)
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
              disabled={!meal}
            />
            <Form.Text style={modalStyles.charCountText}>
              {200 - notes.length} characters remaining
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={modalStyles.footer}>
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          style={{
            ...modalStyles.button,
            marginRight: "0.75rem",
            borderColor: themeColors.secondary,
            color: themeColors.secondary,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = themeColors.secondary;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = themeColors.secondary;
          }}
        >
          <X size={18} style={{ marginRight: "6px" }} /> Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{
            ...modalStyles.button,
            backgroundColor: themeColors.primary,
            borderColor: themeColors.primary,
            opacity: isSubmitDisabled ? 0.65 : 1,
          }}
          onMouseOver={(e) => {
            if (!isSubmitDisabled)
              e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            if (!isSubmitDisabled)
              e.currentTarget.style.backgroundColor = themeColors.primary;
          }}
          disabled={isSubmitDisabled}
        >
          <BagCheckFill size={18} style={{ marginRight: "8px" }} /> Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

OrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmitOrder: PropTypes.func.isRequired,
};

OrderModal.defaultProps = {
  meal: null,
};

export default OrderModal;
