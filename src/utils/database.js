/* Function to get data */
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

/* Function to get amount of certain data */
export const getDataByCategory = async (id) => {
  try {
    const response = await fetch(
      `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/categories/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const { body } = await response.json();
    const { count } = JSON.parse(body);
    return count;
  } catch (error) {
    throw new Error("Error fetching quantity");
  }
};

/* Function to add a new category */
export const addCategory = async (data) => {
  try {
    const response = await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/categories",
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
      throw new Error(`Failed to add category. Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

/* Function to add a new client */
export const addClient = async (data, idType) => {
  try {
    const requestData = {
      ...data,
      tid: idType,
    };
    const response = await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/customer",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to add client. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error adding client:", error);
    throw new Error("Failed to add client");
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
    // Validación de datos
    if (
      isNaN(Number(data.price)) ||
      isNaN(Number(data.sugprice)) ||
      isNaN(Number(data.stock)) ||
      !data.name ||
      !idCategory ||
      !idSupplier ||
      !idType ||
      !idUnit
    ) {
      throw new Error("Invalid data or missing required fields");
    }
    // Asignación de valores
    const requestData = {
      ...data,
      supplier: idSupplier,
      category: idCategory,
      type: idType,
      unit: idUnit,
      price: Number(data.price),
      sugprice: Number(data.sugprice),
      stock: Number(data.stock),
      name: data.name.toLowerCase(),
    };

    console.log(requestData)

    // Llamada a la API para agregar producto al inventario
    await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/inventory",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product to inventory");
  }
};

/* Function to add a new supplier */
export const addSupplier = async (data) => {
  try {
    console.log(JSON.stringify(data));
    data.name = data.name.toLowerCase();
    data.lastname = data.lastname.toLowerCase();
    data.address = data.address.toLowerCase();
    data.comercial = data.commercial.toLowerCase();
    const response = await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/suppliers",
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
    return true;
  } catch (error) {
    console.error("Error adding supplier:", error);
    return false;
  }
};

/* Function to update data */
export const updateData = async (url, id, newData) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error; // Puedes manejar el error aquí o relanzarlo para que lo maneje la capa superior
  }
};
