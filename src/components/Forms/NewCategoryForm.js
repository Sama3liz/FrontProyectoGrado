import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { addCategory } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomInputText from "../Inputs/CustomInputText";

const NewCategoryForm = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goBack } = useNavigationHelpers();

  const onSubmitPressed = async (data) => {
    try {
      await addCategory(data);
      route.params.updateCategories();
      goBack();
    } catch (error) {
      alert(error);
    }
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={newPasswordStyles.root}>
        <Text style={newPasswordStyles.title}>Category</Text>
        <CustomInputText
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
