import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addClient } from "../../utils/dbFunctions";
import CustomInputText from "../Inputs/CustomInputText";
import { useState } from "react";
import useNavigationHelpers from "../../utils/navigationHelpers";

const NewClientForm = ({ route }) => {
  const { control, handleSubmit, watch } = useForm();
  const { goBack } = useNavigationHelpers();
  const [idType, setIdType] = useState(0);

  const onSubmitPressed = async (data) => {
    try {
      await addClient(data, idType);
      route.params.updateClients();
      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Client</Text>
        <CustomPicker
          name="tid"
          able={true}
          options={["RUC", "CI"]}
          defaultValue={"RUC"}
          control={control}
          setIndex={setIdType}
          rules={{ required: "Type identification is required" }}
        />
        {watch("tid") === "CI" ? (
          <CustomInputText
            placeholder="ID"
            name="id"
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
          <CustomInputText
            placeholder="ID"
            name="id"
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

        <CustomInputText
          placeholder="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomInputText
          placeholder="Lastname"
          name="lastname"
          control={control}
          rules={{ required: "Lastname is required" }}
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

export default NewClientForm;
