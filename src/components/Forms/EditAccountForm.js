import { useForm } from "react-hook-form";
import { View, ScrollView } from "react-native";
import CustomButton from "../Buttons/CustomButton";
import CustomInputText from "../Inputs/CustomInputText";
import useNavigationHelpers from "../../utils/navigationHelpers";
import styles from "../../styles/styles";
import { useEffect } from "react";

const EditAccountForm = ({ route }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { goBack } = useNavigationHelpers();
  const { item } = route.params;
  const id = item.id_cuenta;

  useEffect(() => {
    setValue("nuevoNombre", item.nombre_cuenta);
  }, []);

  const onSubmitPressed = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        `https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/accounts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }
      // Si la solicitud fue exitosa, puedes hacer algo con la respuesta aquí
      const responseBody = await response.json(); // Obtén el cuerpo de la respuesta
      console.log(responseBody);
      // Ejecuta la función para actualizar la lista
      route.params.updateList();
      // Regresar a la página anterior
      goBack();
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.root}
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={[styles.container, { justifyContent: "center" }]}>
        <View style={styles.customerDetails}>
          <CustomInputText
            placeholder="Insert the name"
            name="nuevoNombre"
            label="Name"
            control={control}
            rules={{
              required: "Address is required",
            }}
          />
        </View>
        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
      </View>
    </ScrollView>
  );
};

export default EditAccountForm;
