import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import { newPasswordStyles } from "../../styles/screenStyles/NewPasswordStyles";
import { addCategory } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomInputText from "../Inputs/CustomInputText";
import styles from "../../styles/styles";

const NewCategoryForm = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goBack } = useNavigationHelpers();

  const onSubmitPressed = async (data) => {
    await addCategory(data);
    route.params.updateCategories();
    goBack();
  };

  const onBackPressed = () => {
    goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Category</Text>
        <CustomInputText
          placeholder="Name"
          name="name"
          label={"Category Name"}
          control={control}
          rules={{ required: "Name is required" }}
        />
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
      </View>
    </ScrollView>
  );
};

export default NewCategoryForm;
