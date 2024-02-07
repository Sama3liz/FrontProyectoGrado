import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addClient } from "../../utils/database";
import CustomInputText from "../Inputs/CustomInputText";
import { useState } from "react";
import useNavigate from "../../utils/navigation";
import styles from "../../styles/styles";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";

const NewClientForm = ({ route }) => {
  const { control, handleSubmit, watch } = useForm();
  const { goBack } = useNavigate();
  const [idType, setIdType] = useState(0);

  const onSubmitPressed = async (data) => {
    await addClient(data, idType);
    route.params.updateClients();
    goBack();
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Register New Client</Text>
        <View style={styles.customerDetails}>
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
              placeholder="Insert a citizenship card number"
              name="id"
              label="CI"
              control={control}
              rules={{
                required: "CI is required",
                pattern: {
                  value: RUC_REGEX,
                  message: "RUC should contain only numbers",
                },
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
              placeholder="Insert a RUC"
              name="id"
              label="RUC"
              control={control}
              rules={{
                required: "RUC is required",
                pattern: {
                  value: RUC_REGEX,
                  message: "RUC should contain only numbers",
                },
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
            placeholder="Insert a name"
            name="name"
            label="Name"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Name should be max 24 characters long",
              },
            }}
          />
          <CustomInputText
            placeholder="Insert a family name"
            name="lastname"
            label="Last Name"
            control={control}
            rules={{
              required: "Last name is required",
              minLength: {
                value: 3,
                message: "Last name should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Last name should be max 24 characters long",
              },
            }}
          />
          <CustomInputText
            placeholder="Insert the email"
            name="email"
            label="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInputText
            placeholder="Insert the phone"
            name="phone"
            label="Phone"
            control={control}
            rules={{
              required: "Phone is required",
              minLength: {
                value: 7,
                message: "Phone should be at least 7 characters long",
              },
              maxLength: {
                value: 10,
                message: "Phone should be max 10 characters long",
              },
            }}
          />
          <CustomInputText
            placeholder="Insert the address"
            name="address"
            label="Address"
            control={control}
            rules={{
              required: "Address is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 50,
                message: "Address should be max 50 characters long",
              },
            }}
          />
        </View>
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default NewClientForm;
