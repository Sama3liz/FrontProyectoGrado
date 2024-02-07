import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addSupplier } from "../../utils/database";
import useNavigate from "../../utils/navigation";
import CustomInputText from "../Inputs/CustomInputText";
import styles from "../../styles/styles";
import { EMAIL_REGEX, RUC_REGEX } from "../../utils/constants";

const NewSupplierForm = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goBack, goTo } = useNavigate();

  const onSubmitPressed = async (data) => {
    data.tid = 1;
    const added = await addSupplier(data);
    if (added) {
      route.params.updateSuppliers();
      goBack();
    } else {
      alert("Failed to add supplier");
    }
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Register New Supplier</Text>
        <View style={styles.customerDetails}>
          <CustomPicker
            able={false}
            options={["RUC", "CI"]}
            name="tid"
            defaultValue={"RUC"}
            control={control}
            rules={{ required: "Type identification is required" }}
          />
          <CustomInputText
            placeholder="ID"
            name="id"
            label={"RUC"}
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
          <CustomInputText
            placeholder="Commercial Name"
            name="commercial"
            label={"Commercial Name"}
            control={control}
            rules={{
              required: "Commercial name is required",
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
            placeholder="Name"
            name="name"
            label={"First Name"}
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
            placeholder="Lastname"
            name="lastname"
            label={"Last Name"}
            control={control}
            rules={{
              required: "Lastname is required",
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
      </View>
    </ScrollView>
  );
};

export default NewSupplierForm;
