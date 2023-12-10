import React, { useContext } from "react";

export const loadData = async (setProducts) => {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const initialProducts = data.products.map((product) => ({
      ...product,
      quantity: 0,
      appliesIVA: true,
    }));
    setProducts(initialProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchCustomerById = async (customerId, setCustomerData) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${customerId}`);
    if (response.status !== 404) {
      const data = await response.json();
      return data
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

export const calculateChange = (text, totals, setChange) => {
  if (parseFloat(text) >= totals.total.toFixed(2)) {
    const newChange = parseFloat(text) - totals.total.toFixed(2);
    setChange(newChange.toFixed(2));
  }
};

export const calculateTotals = (selectedProducts, setTotals) => {
  const newTotals = {
    subtotal: selectedProducts.reduce(
      (total, product) =>
        product.appliesIVA ? total + product.price * product.quantity : total,
      0
    ),
    tariff0: selectedProducts.reduce(
      (total, product) =>
        !product.appliesIVA ? total + product.price * product.quantity : total,
      0
    ),
    tariff12: selectedProducts.reduce(
      (total, product) =>
        product.appliesIVA ? total + product.price * product.quantity : total,
      0
    ),
    iva12:
      selectedProducts.reduce(
        (total, product) =>
          product.appliesIVA ? total + product.price * product.quantity : total,
        0
      ) * 0.12,
    total:
      selectedProducts.reduce(
        (total, product) =>
          product.appliesIVA ? total + product.price * product.quantity : total,
        0
      ) * 1.12,
  };
  setTotals(newTotals);
};

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
        product.quantity + 1,
        selectedProducts,
        setSelectedProducts
      );
    } else {
      const newProduct = { ...productToAdd, quantity: 1 };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  }
};

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
