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
    throw new Error("Item name must be at least 2 characters long");
  }
  // Quantity validation
  if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
    throw new Error("Quantity must be a valid positive number");
  }
  // Date validation (must be future date)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time
  const lastDate = new Date(lastdate);
  lastDate.setHours(0, 0, 0, 0); // remove time
  if (isNaN(lastDate.getTime()) || lastDate < today) {
    throw new Error("Last date must be today or a future date");
  }

  // Price validation
  if (Number(minprice) <= 0 || Number(maxprice) <= 0) {
    throw new Error("Price values must be greater than zero");
  }

  if (Number(minprice) > Number(maxprice)) {
    throw new Error("Minimum price cannot be greater than maximum price");
  }
};

const validateRFPQuotePayload = (data) => {
  const {
    vendor_price,
    item_description,
    quantity,
    totalcost
  } = data;  // Required fields check
  if (
    !vendor_price ||
    !item_description ||
    !quantity ||
    !totalcost
  ) {
    throw new Error("All fields are required");
  }
  // Item name length
   if (!Number.isInteger(Number(vendor_price)) || Number(vendor_price) <= 0) {
    throw new Error("Vendor price must be a valid positive number");
  }
  if (item_description.trim().length < 2 || item_description.trim().length > 255) {
    throw new Error("Item name must be between 2 to 255 characters long");
  }
  // Quantity validation
  if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
    throw new Error("Quantity must be a valid positive number");
  }
  // total cost validation
  if (!Number.isInteger(Number(totalcost)) || Number(totalcost) <= 0) {
    throw new Error("Total cost must be a valid positive number");
  }
};

module.exports = { validateRFPPayload, validateRFPQuotePayload};