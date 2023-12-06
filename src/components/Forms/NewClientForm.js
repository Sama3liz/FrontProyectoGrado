import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addClient } from "../../utils/dbFunctions";

const NewClientForm = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();

  const onSubmitPressed = async(data) => {
    try {
      await addClient(data);
      console.log(data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Client</Text>
        <CustomPicker
          name="tid"
          able={true}
          defaultValue={"RUC"}
          options={["RUC","CI"]}
          control={control}
          rules={{ required: "Type identification is required" }}
        />
        {watch("tid") === "CI" ? (
          <CustomInput
            placeholder="ID"
            name="id"
            type="number"
            control={control}
            rules={{
              required: "CI is required",
              minLength: {
                value: 10,
                message: "CI should be at least 10 digits long",
              },
              maxLength: {
                value: 10,
                message: "CI should be maximum 10 digits long",
              },
            }}
          />
        ) : (
          <CustomInput
            placeholder="ID"
            name="id"
            type="number"
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
        )}

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

export default NewClientForm;
