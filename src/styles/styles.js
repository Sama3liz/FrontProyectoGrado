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
    padding: 20,
    backgroundColor: "#F9FBFC",
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
  containerTable: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
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
  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
    backgroundColor: "white",
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
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
    borderRightWidth: 1,
    borderColor: "grey",
    padding: 5,
  },
  cellRowTable: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameTable: {
    textAlign: "center",
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
  /* Profile */
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  info: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 18,
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemDetails: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#26A69A",
    padding: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  /* Input */
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#F9FBFC",
    paddingHorizontal: 5,
    fontSize: 12,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  /* Images */
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  /* Text */
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  /* Link */
  link: {
    color: '#FDB075',
  },
});
