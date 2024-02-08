/* Function to search customer by ID */
export const searchCustomerById = async (
  customerId,
  setErrorMessage,
  setValue
) => {
  try {
    const response = await fetch(
      `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer/search?id=${customerId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const body = JSON.parse(data.body);
    if (Array.isArray(body) && body.length > 0) {
      return body[0];
    } else {
      setErrorMessage("No customer found with the provided ID");
      clearCustomerValues(setValue);
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

export const setCustomerValues = (customerData, setValue) => {
  setValue("name", customerData.firstname);
  setValue("lastname", customerData.lastname);
  setValue("email", customerData.email);
  setValue("address", customerData.address);
  setValue("phone", customerData.phone);
};

/* Function to clear customer values */
export const clearCustomerValues = (setValue) => {
  /* setValue("ci", ""); */
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
