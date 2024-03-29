import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { useEffect, useState } from "react";
import useNavigate from "../../utils/navigation";
import {
  addProductToInventory,
  fetchData,
  getDataByCategory,
} from "../../utils/database";
import CustomInputText from "../Inputs/CustomInputText";
import CustomInputNumber from "../Inputs/CustomInputNumber";
import styles from "../../styles/styles";

const NewProductForm = ({ route }) => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const { goTo, goBack } = useNavigate();
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
    if (idCategory !== 0) {
      getInternalCode(category, idCategory);
    }
  }, [price, category, idCategory]);

  const load_data_sup = async () => {
    try {
      const data = await fetchData(
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/suppliers"
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
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/categories"
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
        "https://zxdz2hq7jg.execute-api.us-east-1.amazonaws.com/dev/types"
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
      const newQuantity = Number(quantity) + 1;
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
      <View style={styles.container}>
        <Text style={styles.title}>Register New Product</Text>
        <CustomInputText
          placeholder="Name"
          name="name"
          label={"Name"}
          control={control}
          rules={{ required: "Name is required" }}
        />
        <Text style={{ fontWeight: "bold" }}>Choose a supplier: </Text>
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
          label={"Supplier Code"}
          control={control}
        />
        <Text style={{ fontWeight: "bold" }}>Choose a category: </Text>
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
          label={"Internal Code"}
          control={control}
          editable={false}
          rules={{ required: "Code is required" }}
        />
        <CustomInputNumber
          placeholder="Price"
          name="price"
          label="Price"
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
          label="Suggested Price"
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
          label="Stock"
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
        <Text style={{ fontWeight: "bold" }}>Choose a unit: </Text>
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
        <Text style={{ fontWeight: "bold" }}>Choose a type: </Text>
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
          label={"Details"}
          control={control}
          rules={{}}
        />
        <CustomInputText
          placeholder="Image"
          name="image"
          label={"Image"}
          control={control}
          rules={{}}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
      </View>
    </ScrollView>
  );
};

export default NewProductForm;
