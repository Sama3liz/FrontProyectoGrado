import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";

const Company = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const onSubmitPressed = /* async */ (data) => {
    console.log(data);
    try {
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
        <Text style={newPasswordStyles.title}>Company Data</Text>
        <CustomInput
          disabled
          placeholder="RUC"
          name="id"
          type="number"
          showDecimals={false}
          control={control}
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

export default Company;
