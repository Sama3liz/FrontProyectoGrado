import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomInput from "../Inputs/CustomInput";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { addCategory } from "../../utils/dbFunctions";

const NewCategoryForm = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmitPressed = async (data) => {
    try {
      await addCategory(data);
      navigation.goBack();
    } catch (error) {
      alert(error);
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Category</Text>
        <CustomInput
          placeholder="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
      </View>
    </ScrollView>
  );
};

export default NewCategoryForm;
