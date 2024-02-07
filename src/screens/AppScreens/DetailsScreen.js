import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import styles from "../../styles/styles";
import { fetchData } from "../../utils/database";
import ResumeCart from "../../components/Card/CustomResumeCart";

export default function DetailsScreen({ route }) {
  const { item } = route.params;
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const id = item.id;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        `https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/invoices/${id}`
      );
      const body = JSON.parse(data.body);
      setInvoiceDetails(body);
      console.log(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!invoiceDetails) {
    return (
      <View
        style={[
          styles.root,
          { alignItems: "center", justifyContent: "center", flex: 1 },
        ]}
      >
        <View style={[styles.container, { justifyContent: "center" }]}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={[
            styles.containerCol,
            {
              rowGap: 20,
            },
          ]}
        >
          <Text style={[styles.title, { alignSelf: "center" }]}>Resume</Text>
          <View style={styles.customerDetails}>
            <Text>CI/RUC: {invoiceDetails.cliente.identificacion}</Text>
            <Text>
              Name:{" "}
              {invoiceDetails.cliente.nombre +
                " " +
                invoiceDetails.cliente.apellido}{" "}
            </Text>
            <Text>Email: {invoiceDetails.cliente.mail}</Text>
            <Text>Phone: {invoiceDetails.cliente.telefono}</Text>
            <Text>Address: {invoiceDetails.cliente.direccion}</Text>
          </View>
          <View style={styles.customerDetails}>
            {invoiceDetails.detalles.map((product, index) => (
              <View key={index} style={styles.void}>
                <View
                  style={[
                    styles.containerRow,
                    { borderBottomWidth: 1, borderColor: "#ccc" },
                  ]}
                >
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                      {product.nombre_producto}
                    </Text>
                    <Text style={styles.itemDescription}>
                      {product.codigo_principal}
                    </Text>
                    <Text style={styles.itemDescription}>
                      ${product.precio_unitario}
                    </Text>
                  </View>
                  <TextInput
                    editable={false}
                    style={styles.quantityInput}
                    value={product.cantidad.toString()}
                  />
                </View>
              </View>
            ))}
          </View>
          <View style={styles.billSummary}>
            {/* {paymentMethod === "Cash" ? (
              <>
                <Text>Method: {paymentMethod}</Text>
                <Text>Change: ${change}</Text>
              </>
            ) : (
              <Text>Method: {paymentMethod}</Text>
            )} */}
            <Text>Subtotal: ${(invoiceDetails.subtotal_sin_impuestos).toFixed(2)}</Text>
            <Text>Tarifa 0: ${(invoiceDetails.sub_total_0).toFixed(2)}</Text>
            <Text>Tarifa 12: ${(invoiceDetails.subtotal_12).toFixed(2)}</Text>
            <Text>12% IVA: ${(invoiceDetails.iva).toFixed(2)}</Text>
            <Text>Total: ${(invoiceDetails.total_factura).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
