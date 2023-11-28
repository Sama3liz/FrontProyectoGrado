import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { useEffect } from "react";
import useNavigationHelpers from "../../utils/navigationHelpers";

const NewProductForm = ({ navigation }) => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const { goTo } = useNavigationHelpers();
  const price = watch("price");

  useEffect(() => {
    if (price) {
      const sugPrice = (price * 1.3).toFixed(2);
      setValue("sugprice", sugPrice);
    }
  }, [price, setValue]);

  const onSubmitPressed = /* async */ (data) => {
    console.log(data);
    data.price = parseFloat(data.price);
    data.sugprice = parseFloat(data.sugprice);
    data.stock = parseInt(data.stock, 10);
    data.supplier = parseInt(data.supplier, 10);
    console.log(data);
    try {
      /* await fetch("/api-endpoint", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); */
      console.log(data);
      navigation.goBack();
    } catch (e) {
      alert(e);
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onNewSupplierPressed = () => {
    goTo("NewSupplier");
  };

  const onNewCategoryPressed = () => {
    goTo("NewCategory");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Product</Text>
        <CustomInput
          placeholder="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomPicker
          name="supplier"
          able={true}
          defaultValue={"0"}
          options={["Supplier 1", "Supplier 2"]}
          control={control}
          rules={{ required: "Supplier is required" }}
        />
        <CustomButton text="Add New Supplier" onPress={onNewSupplierPressed} />
        <CustomInput
          placeholder="Code Suplier"
          name="supcod"
          control={control}
          rules={{ required: "Code supplier is required" }}
        />
        <CustomInput
          placeholder="Internal Code"
          name="intcod"
          control={control}
          rules={{ required: "Code is required" }}
        />
        <CustomPicker
          name="category"
          able={true}
          defaultValue={"0"}
          options={["Category 1", "Category 2"]}
          control={control}
          rules={{ required: "Category is required" }}
        />
        <CustomButton text="Add New Category" onPress={onNewCategoryPressed}/>
        <CustomInput
          placeholder="Price"
          name="price"
          type={"number"}
          valueAsNumber
          control={control}
          rules={{
            required: "Price is required",
            pattern: {
              value: /^\d*\.?\d*$/,
              message: "Only numbers allowed",
            },
          }}
        />
        <CustomInput
          disabled
          placeholder="Suggested Price"
          name="sugprice"
          control={control}
          editable={false}
          rules={{
            required: "Sugested price is required",
            pattern: {
              value: /^\d*\.?\d*$/,
              message: "Only numbers allowed",
            },
          }}
        />
        <CustomInput
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
          defaultValue={"0"}
          options={["Unit 1", "Unit 2"]}
          control={control}
          rules={{ required: "Unit is required" }}
        />
        <CustomPicker
          name="type"
          able={true}
          defaultValue={"0"}
          options={["Type 1", "Type 2"]}
          control={control}
          rules={{ required: "Type is required" }}
        />
        <CustomInput
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
