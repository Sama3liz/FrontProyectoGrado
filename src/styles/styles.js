import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  void: {},
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
  error: {
    color: "red",
  },
  /* Containers */
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  containerRow: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerCol: {
    flex: 1,
    marginTop: 10,
    width: "100%",

    justifyContent: "center",
    paddingHorizontal: 10,
  },
  customerDetails: {
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  searchProduct: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedProducts: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    /* borderBottomColor: "#ccc", */
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#ddd",
  },
  itemDetails: {
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    width: "50%",
  },
  billSummary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  /* Buttons */
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  /* Buttons Styles */
  buttonContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  buttonRowContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  container_TERTIARY: {},
  container_DANGER: {},
  textButton: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
  text_TERTIARY: {
    color: "gray",
  },
  text_DANGER: {
    color: "red",
  },
  removeButton: {
    paddingHorizontal: 8,
  },
  /* Table Styles */
  containerTable: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  headerTextTable: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  itemTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cellTable: {
    flex: 1,
    textAlign: "center",
  },
  nameTable: {
    textAlign: "left",
  },
  /* Billing Styles  */
  cartContainer: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    /* flex: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 5,
    marginRight: 10, */
    backgroundColor: "white",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "right",
  },
  quantityInput: {
    padding: 8,
    marginVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
    width: 40,
    textAlign: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
});
