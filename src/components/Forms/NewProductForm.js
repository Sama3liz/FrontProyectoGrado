import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { useEffect, useState } from "react";
import useNavigationHelpers from "../../utils/navigationHelpers";
import {
  addProductToInventory,
  fetchData,
  getDataByCategory,
} from "../../utils/dbFunctions";
import CustomInputText from "../Inputs/CustomInputText";
import CustomInputNumber from "../Inputs/CustomInputNumber";

const NewProductForm = ({ route }) => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const { goTo, goBack } = useNavigationHelpers();
  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [idSupplier, setIdSupplier] = useState(0);
  const [types, setTypes] = useState([]);
  const [idType, setIdType] = useState(0);
  const [idUnit, setIdUnit] = useState(0);
  const price = watch("price");
  const category = watch("category");

  useEffect(() => {
    load_data_sup();
    load_data_cat();
    load_data_type();
    getSuggestedPrice(price);
    getInternalCode(category, idCategory);
  }, [price, category, idCategory]);

  const load_data_sup = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/suppliers"
      );
      const body = JSON.parse(data.body);
      const array = body.map((item) => item.commercial);
      setSuppliers(array);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const load_data_cat = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/categories"
      );
      const body = JSON.parse(data.body);
      const array = body.map((item) => item.name);
      setCategories(array);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const load_data_type = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/types"
      );
      const body = JSON.parse(data.body);
      const array = body.map((item) => item.name);
      setTypes(array);
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  };

  const extractInitials = (categoryName) => {
    const words = categoryName.split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
    return initials.toUpperCase();
  };

  const getInternalCode = async (id) => {
    if (category) {
      const sugCode = extractInitials(category);
      const quantity = await getDataByCategory(idCategory);
      console.log(quantity);
      const newQuantity = quantity + 1;
      console.log(newQuantity);
      setValue("intcod", sugCode + "-" + newQuantity);
    }
  };

  const getSuggestedPrice = (price) => {
    if (price) {
      const sugPrice = (price * 1.3).toFixed(2);
      setValue("sugprice", sugPrice);
    }
  };

  const updateSuppliers = () => {
    load_data_sup();
  };

  const updateCategories = () => {
    load_data_cat();
  };

  const onSubmitPressed = async (data) => {
    try {
      await addProductToInventory(data, idCategory, idSupplier, idType, idUnit);
      route.params.updateProducts();
      goBack();
    } catch (error) {
      alert(error);
    }
  };

  const onBackPressed = () => {
    goBack();
  };

  const onNewSupplierPressed = () => {
    goTo("NewSupplier", { updateSuppliers });
  };

  const onNewCategoryPressed = () => {
    goTo("NewCategory", { updateCategories });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Product</Text>
        <CustomInputText
          placeholder="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomPicker
          name="supplier"
          able={true}
          options={suppliers}
          control={control}
          setIndex={setIdSupplier}
          rules={{ required: "Supplier is required" }}
        />
        <CustomButton text="Add New Supplier" onPress={onNewSupplierPressed} />
        <CustomInputText
          placeholder="Code Supplier"
          name="supcod"
          control={control}
          rules={{ required: "Code supplier is required" }}
        />
        <CustomPicker
          name="category"
          able={true}
          options={categories}
          control={control}
          setIndex={setIdCategory}
          rules={{ required: "Category is required" }}
        />
        <CustomButton text="Add New Category" onPress={onNewCategoryPressed} />
        <CustomInputText
          disabled
          placeholder="Internal Code"
          name="intcod"
          control={control}
          editable={false}
          rules={{ required: "Code is required" }}
        />
        <CustomInputNumber
          placeholder="Price"
          name="price"
          type={"number"}
          valueAsNumber
          showDecimals={true}
          control={control}
          rules={{
            required: "Price is required",
            pattern: {
              value: /^\d*\.?\d*$/,
              message: "Only numbers allowed",
            },
          }}
        />

        <CustomInputNumber
          disabled
          placeholder="Suggested Price"
          name="sugprice"
          control={control}
          editable={false}
          rules={{
            required: "Suggested price is required",
            pattern: {
              value: /^\d*\.?\d*$/,
              message: "Only numbers allowed",
            },
          }}
        />

        <CustomInputNumber
          placeholder="Stock"
          name="stock"
          control={control}
          type={"number"}
          showDecimals={false}
          rules={{
            required: "Stock is required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Only numbers allowed",
            },
          }}
        />
        <CustomPicker
          name="unit"
          able={true}
          options={[
            "Meters",
            "Liters",
            "Gallons",
            "Units",
            "Kilograms",
            "Pounds",
            "Inches",
            "Centimeters",
            "Milliliters",
            "Fluid Ounces",
          ]}
          /* const unidadesDeMedida = ['Metros', 'Litros', 'Galones', 'Unidades', 'Kilogramos', 'Libras', 'Pulgadas', 'Centímetros', 'Mililitros', 'Onzas líquidas'];
           */
          control={control}
          setIndex={setIdUnit}
          rules={{ required: "Unit is required" }}
        />
        <CustomPicker
          name="type"
          able={true}
          options={types}
          control={control}
          setIndex={setIdType}
          rules={{ required: "Type is required" }}
        />
        <CustomInputText
          placeholder="Details"
          name="details"
          control={control}
          rules={{}}
        />

        <CustomInputText
          placeholder="Image"
          name="image"
          control={control}
          rules={{}}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default NewProductForm;
