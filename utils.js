export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Invalid Date";
  }
};

 export const formatPrice = (price) => {
    return `GH₵${price.toFixed(2)}`;
  };

