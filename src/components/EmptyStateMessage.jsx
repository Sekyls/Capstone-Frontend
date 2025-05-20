import PropTypes from "prop-types";

const EmptyStateMessage = ({ entityName }) => {
  return (
    <div className="container my-5">
      <p className="text-center text-muted">
        No {entityName} available at this time.
      </p>
    </div>
  );
};

EmptyStateMessage.propTypes = {
  entityName: PropTypes.string.isRequired,
};

EmptyStateMessage.defaultProps = {
  entityName: "items",
};

export default EmptyStateMessage;
