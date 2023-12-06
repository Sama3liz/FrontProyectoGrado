import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addSupplier } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";

const NewSupplierForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const { goBack, goTo } = useNavigationHelpers();

  const onSubmitPressed = async (data) => {
    const added = await addSupplier(data);
    if (added) {
      navigation.goBack();
    } else {
      alert("Failed to add supplier");
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Supplier</Text>
        <CustomPicker
          able={false}
          options={["RUC", "CI"]}
          name="tid"
          defaultValue="RUC"
          control={control}
          rules={{ required: "Type identification is required" }}
        />
        <CustomInput
          placeholder="ID"
          name="id"
          type="number"
          pattern="\d*"
          control={control}
          showDecimals={false}
          rules={{
            required: "RUC is required",
            minLength: {
              value: 13,
              message: "RUC should be at least 13 digits long",
            },
            maxLength: {
              value: 13,
              message: "RUC should be maximum 13 digits long",
            },
          }}
        />
        <CustomInput
          placeholder="Comercial Name"
          name="comercial"
          control={control}
          rules={{ required: "Comercial name is required" }}
        />
        <CustomInput
          placeholder="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomInput
          placeholder="Lastname"
          name="lastname"
          control={control}
          rules={{ required: "Lastname is required" }}
        />
        <CustomInput
          placeholder="Email"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
        />
        <CustomInput
          placeholder="Phone"
          name="phone"
          control={control}
          rules={{ required: "Phone is required" }}
        />
        <CustomInput
          placeholder="Address"
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default NewSupplierForm;
