import { useForm } from "react-hook-form";
import { View, Text, TextInput, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import styles from "../../styles/styles";
import { addCategory } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";
import CustomInputText from "../Inputs/CustomInputText";

const NewAccountForm = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const { goBack } = useNavigationHelpers();

  const onSubmitPressed = async (data) => {
    try {
      route.params.updateList();
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
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.void}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>
      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
      <CustomButton text="Back" onPress={onBackPressed} type="PRIMARY" />
    </ScrollView>
  );
};

export default NewAccountForm;
