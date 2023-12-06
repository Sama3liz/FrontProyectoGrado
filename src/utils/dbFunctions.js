// utils/dbFunctions.js

// Example function to fetch customer data by ID
export const fetchCustomerById = async (customerId) => {
  try {
    const response = await fetch(
      `https://example.com/api/customers/${customerId}`
    );
    const data = await response.json();
    return data; // Assuming the API returns customer data
  } catch (error) {
    console.error("Error fetching customer data:", error);
    return null;
  }
};

/* Function to fetch data */
export const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/* Function to add a new category */
export const addCategory = async (data) => {
  try {
    const response = await fetch(
      "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/addCategory",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

/* Function to add a new client */
export const addClient = async (data) => {
  try {
    const response = await fetch(
      "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/addClient",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

/* Function to add new product */
export const addProductToInventory = async (
  data,
  idCategory,
  idSupplier,
  idType,
  idUnit
) => {
  try {
    data.price = parseFloat(data.price);
    data.sugprice = parseFloat(data.sugprice);
    data.stock = parseInt(data.stock, 10);
    data.supplier = idSupplier;
    data.category = idCategory;
    data.type = idType;
    data.unit = idUnit;
    data.name = data.name.toLowerCase();
    console.log(data);
    /* await fetch(
      "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/addInv",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ); */
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/* Function to add a new supplier */
export const addSupplier = async (data) => {
  try {
    data.name = data.name.toLowerCase();
    data.lastname = data.lastname.toLowerCase();
    data.address = data.address.toLowerCase();
    data.comercial = data.comercial.toLowerCase();
    const response = await fetch(
      "https://c9ng6xj8f5.execute-api.us-east-1.amazonaws.com/addSupplier",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add supplier");
    }
    console.log(data);
    return true;
  } catch (error) {
    console.error("Error adding supplier:", error);
    return false;
  }
};
