const validateRegisterPayload = (data) => {
  const { firstName, lastName, email, password } = data;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must be at least 6 characters long and include letters, numbers, and special characters");
  }
};

const validateRegisterPayloadForVendor = (data) => {
  const { firstName, lastName, email, password, confirmPassword, revenue, noOfEmployees, gstNo, panNo, phoneNo } = data;
  const categoriesArray = data.categories || data['categories[]'];

  if (!firstName || !lastName || !email || !password || !confirmPassword || !revenue || !noOfEmployees || !gstNo || !panNo || !phoneNo || (categoriesArray === undefined || categoriesArray === null)) {
    throw new Error("All fields are required");
  }

  // If it's an array, ensure it's not empty. If it's a string, it's fine (could be empty string for 'All')
  if (Array.isArray(categoriesArray) && categoriesArray.length === 0) {
    throw new Error("All fields are required");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must be at least 6 characters long and include letters, numbers, and special characters");
  }
  if (!/^[0-9]{10}$/.test(phoneNo)) {
    throw new Error("Invalid phone number");
  }
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNo)) {
    throw new Error("Invalid PAN number");
  }
};

module.exports = { validateRegisterPayload, validateRegisterPayloadForVendor };