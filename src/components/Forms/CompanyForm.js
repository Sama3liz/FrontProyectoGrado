import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomInputText from "../Inputs/CustomInputText";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useNavigationHelpers from "../../utils/navigationHelpers";

const Company = () => {
  const { user } = useContext(AuthContext);
  const { control, handleSubmit, setValue } = useForm();
  const { goBack } = useNavigationHelpers();

  useEffect(() => {
    setValue("ruc", user.payload["cognito:username"]);
  }, [setValue]);

  const onSubmitPressed = /* async */ (data) => {
    console.log(data);
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Company Data</Text>
        <CustomInputText
          disabled
          name="ruc"
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
        <CustomInputText
          placeholder="Comercial Name"
          name="comercial"
          control={control}
          rules={{ required: "Comercial name is required" }}
        />
        <CustomInputText
          placeholder="Email"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
        />
        <CustomInputText
          placeholder="Phone"
          name="phone"
          control={control}
          rules={{ required: "Phone is required" }}
        />
        <CustomInputText
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
