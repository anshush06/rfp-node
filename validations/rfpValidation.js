const validateRFPPayload = (data) => {
  const {
    category_id,
    item_name,
    item_description,
    quantity,
    lastdate,
    minprice,
    maxprice,
  } = data;
  const vendors = data.vendors || data['vendors[]'];
  // Required fields check
  if (
    !item_name ||
    !item_description ||
    !quantity ||
    !lastdate ||
    !minprice ||
    !maxprice ||
    !vendors ||
    vendors.length === 0
  ) {
    throw new Error("All fields are required");
  }
  if (!category_id) {
    throw new Error("Category ID is Required");
  }
  // Item name length
  if (item_name.trim().length < 3) {
    throw new Error("Item name must be at least 3 characters long");
  }
  // Quantity validation
  if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
    throw new Error("Quantity must be a valid positive number");
  }
  // Date validation (must be future date)
  const today = new Date();
  const lastDate = new Date(lastdate);
  if (isNaN(lastDate.getTime()) || lastDate <= today) {
    throw new Error("Last date must be a valid future date");
  }
  // Price validation
  if (Number(minprice) <= 0 || Number(maxprice) <= 0) {
    throw new Error("Price values must be greater than zero");
  }

  if (Number(minprice) > Number(maxprice)) {
    throw new Error("Minimum price cannot be greater than maximum price");
  }

  // Vendors validation
  if (!Array.isArray(vendors)) {
    throw new Error("Invalid vendors data");
  }
};

module.exports = { validateRFPPayload };
