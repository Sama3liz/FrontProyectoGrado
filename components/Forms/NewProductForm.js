import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";

const NewProductForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmitPressed = /* async */ (data) => {
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
        <CustomInput
          placeholder="Suplier"
          name="suplier"
          control={control}
          rules={{ required: "Supplier is required" }}
        />
        <CustomInput
          placeholder="Code Suplier"
          name="supcod"
          control={control}
          rules={{ required: "Code supplier is required" }}
        />
        <CustomInput
          placeholder="Category"
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
        />
        <CustomInput
          placeholder="Price"
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
        />
        <CustomInput
          placeholder="Suggested Price"
          name="sugprice"
          control={control}
          rules={{ required: "Sugested price is required" }}
        />
        <CustomInput
          placeholder="Stock"
          name="stock"
          control={control}
          rules={{ required: "Stock is required" }}
        />
        <CustomInput
          placeholder="Unit"
          name="unit"
          control={control}
          rules={{ required: "Unit is required" }}
        />
        <CustomInput
          placeholder="Type"
          name="type"
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
