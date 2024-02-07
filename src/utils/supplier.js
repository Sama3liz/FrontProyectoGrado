/* Function to get supplier data by id */
export const getSupplierById = async (supplierId) => {
  const url = `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/suppliers/${supplierId}`;

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
      throw new Error("Failed to fetch supplier data");
    }
  } catch (error) {
    console.error("Error fetching supplier data:", error);
    throw error;
  }
};

/* Function to update supplier data by id */
export const updateSupplierData = async (supplierId, supplierData) => {
  const url = `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/suppliers/${supplierId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to update supplier data");
    }
  } catch (error) {
    console.error("Error updating supplier data:", error);
    throw error;
  }
};

/* Function to set supplier values */
export const setSupplierValues = (supplierData, setValue) => {
  setValue("commercial", supplierData.commercial);
  setValue("name", supplierData.firstname);
  setValue("lastname", supplierData.lastname);
  setValue("email", supplierData.email);
  setValue("address", supplierData.address);
  setValue("phone", supplierData.phone);
};
