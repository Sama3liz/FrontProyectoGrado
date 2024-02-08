/* Function to load products from db */
export const loadData = async (setProducts) => {
  try {
    const response = await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/inventory",
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
    const initialProducts = body.map((product) => ({
      ...product,
      quantity: 0,
      appliesIVA: product.prediccion === "0" ? false : true,
    }));
    setProducts(initialProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/* Function to get the current date */
export const getCurrentDate = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};

/* Function to calculate cash change */
export const calculateChange = (text, totals, setChange) => {
  if (parseFloat(text) >= totals.total.toFixed(2)) {
    const newChange = parseFloat(text) - totals.total.toFixed(2);
    setChange(newChange.toFixed(2));
  }
};

/* Function to calculate taxes and totals */
export const calculateTotals = (selectedProducts, setTotals) => {
  const subtotal = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const tariff0 = selectedProducts.reduce(
    (total, product) =>
      !product.appliesIVA ? total + product.price * product.quantity : total,
    0
  );
  const tariff12 = selectedProducts.reduce(
    (total, product) =>
      product.appliesIVA ? total + product.price * product.quantity : total,
    0
  );
  const iva12 = tariff12 * 0.12;
  const total = subtotal + iva12;
  const newTotals = {
    subtotal,
    tariff0,
    tariff12,
    iva12,
    total,
  };
  setTotals(newTotals);
};

/* Function to add to the invoice */
export const handleAddToInvoice = (
  productId,
  products,
  selectedProducts,
  setSelectedProducts
) => {
  const productToAdd = products.find((product) => product.id === productId);
  if (productToAdd) {
    const existingProduct = selectedProducts.find(
      (product) => product.id === productId
    );
    if (existingProduct) {
      handleQuantityChange(
        productId,
        existingProduct.quantity + 1,
        selectedProducts,
        setSelectedProducts
      );
    } else {
      const newProduct = { ...productToAdd, quantity: 1 };
      setSelectedProducts([...selectedProducts, newProduct]);
      /* handleRemoveFromFiltered(productId, filteredProducts, setFilteredProducts); */
    }
  }
};

/* Function to remove selected products from list */
export const handleRemoveFromFiltered = (
  productId,
  filteredProducts,
  setFilteredProducts
) => {
  const updatedFilteredProducts = filteredProducts.filter(
    (product) => product.id !== productId
  );
  setFilteredProducts(updatedFilteredProducts);
};

/* Function to handle the quantity */
export const handleQuantityChange = (
  productId,
  quantity,
  selectedProducts,
  setSelectedProducts
) => {
  const newQuantity = parseInt(quantity);
  if (!isNaN(newQuantity) && newQuantity >= 0) {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts);
  }
};

/* Function to select the product */
export const handleProductSelection = (
  product,
  selectedProducts,
  setSelectedProducts,
  products,
  setProducts
) => {
  const existingProductIndex = selectedProducts.findIndex(
    (item) => item.id === product.id
  );
  if (existingProductIndex !== -1) {
    handleQuantityChange(
      product.id,
      product.quantity + 1,
      selectedProducts,
      setSelectedProducts
    );
  } else {
    const newProduct = { ...product, quantity: 1 };
    setSelectedProducts([...selectedProducts, newProduct]);

    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, quantity: 1 } : item
    );
    setProducts(updatedProducts);
  }
};

/* Function to clean when submit */
export const handleSubmitClean = (
  setValue,
  setSelectedProducts,
  setFilteredProducts,
  setChange,
  setPaymentMethod,
  clearError
) => {
  setValue("ci", "");
  setValue("name", "");
  setValue("lastname", "");
  setValue("email", "");
  setValue("address", "");
  setValue("phone", "");
  setSelectedProducts([]);
  setFilteredProducts([]);
  setChange("");
  setPaymentMethod("");
  clearError();
};

/* Function to remove selected products form cart */
export const handleRemoveFromInvoice = (
  productId,
  selectedProducts,
  setSelectedProducts
) => {
  const updatedProducts = selectedProducts.filter(
    (product) => product.id !== productId
  );
  setSelectedProducts(updatedProducts);
};

/* Function to send the invoice to store */
export const sendBillingData = async (newBillingData) => {
  try {
    const response = await fetch(
      "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/invoices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBillingData),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al enviar los datos de facturación: " + response.statusText
      );
    }

    const responseData = await response.json();
    console.log("Respuesta del servidor:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error al enviar los datos de facturación:", error);
    throw new Error("Error al enviar los datos de facturación");
  }
};
