/* Function to search customer by ID */
export const searchCustomerById = async (customerId) => {
  try {
    const response = await fetch(
      `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer/search/${customerId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.body);
    /* if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    } */
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

/* Function to search customer */
export const searchCustomer = async (
  customerId,
  searchCustomerById,
  setErrorMessage,
  clearError,
  setValue
) => {
  try {
    if (customerId) {
      const data = await searchCustomerById(customerId);
      if (data) {
        setSearchCustomer(data, clearError, setErrorMessage, setValue);
      } else {
        setErrorMessage("No customer found with the provided ID");
      }
    } else {
      setErrorMessage("Please provide a valid ID for the customer search");
    }
  } catch (error) {
    console.error("Error searching for customer:", error);
    setErrorMessage("Error searching for customer. Please try again.");
  }
};

/* Function to set de data of the customer */
export const setSearchCustomer = (
  customerData,
  clearError,
  setErrorMessage,
  setValue
) => {
  if (customerData !== null) {
    clearError();
    setCustomerValues(customerData, setValue);
  } else {
    setErrorMessage("Client not found");
    clearCustomerValues(setValue);
  }
};

/* Function to set customer values */
export const setCustomerValues = (customerData, setValue) => {
  setValue("name", customerData.firstname);
  setValue("lastname", customerData.lastname);
  setValue("email", customerData.email);
  setValue("address", customerData.address);
  setValue("phone", customerData.phone);
};

/* Function to clear customer values */
export const clearCustomerValues = (setValue) => {
  setValue("ci", "");
  setValue("name", "");
  setValue("lastname", "");
  setValue("email", "");
  setValue("address", "");
  setValue("phone", "");
};

/* Function to get the customer data by id */
export const getCustomerById = async (customerId) => {
  const url = `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer/${customerId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch customer data");
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

/* Function to update the customer data by id */
export const updateCustomerData = async (customerId, customerData) => {
  const url = `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer/${customerId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to update customer data");
    }
  } catch (error) {
    console.error("Error updating customer data:", error);
    throw error;
  }
};
