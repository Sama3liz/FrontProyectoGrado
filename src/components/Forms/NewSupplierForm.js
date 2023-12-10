import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import CustomPicker from "../Pickers/CustomPicker";
import { addSupplier } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomInputText from "../Inputs/CustomInputText";

const NewSupplierForm = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goBack, goTo } = useNavigationHelpers();

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
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Register New Supplier</Text>
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
          placeholder="Commercial Name"
          name="commercial"
          control={control}
          rules={{ required: "Commercial name is required" }}
        />
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

export default NewSupplierForm;
