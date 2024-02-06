import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useError } from "../../context/ErrorContext";
import CustomInputText from "../../components/Inputs/CustomInputText";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Buttons/CustomButton";
import { loadData } from "../../utils/useBilling";
import { Ionicons } from "@expo/vector-icons";
import { fetchData } from "../../utils/dbFunctions";
import useNavigationHelpers from "../../utils/navigationHelpers";

const NewAccountForm = ({ route }) => {
  const { errorMessage, setErrorMessage, clearError } = useError();
  const { control, handleSubmit, setValue } = useForm();
  const { goTo, goBack } = useNavigationHelpers();
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchData(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/accounts"
      );
      const body = JSON.parse(data.body);
      setAccounts(body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = accounts.filter(
      (account) =>
        account.nombre_cuenta.toLowerCase().includes(query) ||
        account.codigo_cuenta.includes(query)
    );
    setFilteredAccounts(filtered);
  };

  const handleAccount = (account) => {
    const accountToAdd = accounts.find(
      (acc) => acc.id_cuenta === account.id_cuenta
    );
    if (accountToAdd) {
      setSelectedAccount((prev) => [...prev, accountToAdd]);
      console.log(selectedAccount);
      splitCodeAndSum(account.codigo_cuenta);
    }
  };

  const splitCodeAndSum = (code) => {
    const splitCode = code.split(".");
    const parentCode = splitCode.join("."); // Código padre

    // Buscar las cuentas hijas existentes bajo el código padre
    const existingChildCodes = accounts
      .filter((account) => {
        const accountCodeParts = account.codigo_cuenta.split(".");
        return (
          accountCodeParts.length === splitCode.length + 1 &&
          account.codigo_cuenta.startsWith(parentCode + ".")
        );
      })
      .map((account) => parseInt(account.codigo_cuenta.split(".").pop()));

    // Determinar el número siguiente en la secuencia
    let nextNumber = 1;
    if (existingChildCodes.length > 0) {
      nextNumber = Math.max(...existingChildCodes) + 1;
    }

    // Crear el nuevo código para la cuenta hija
    const childCode = parentCode + "." + ("0" + nextNumber).slice(-2);

    setValue("code", childCode);
  };

  const renderAccountList = ({ item }) => (
    <View
      style={[
        styles.itemContainer,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>Código: {item.codigo_cuenta}</Text>
        <Text style={styles.itemDescription}>Nombre: {item.nombre_cuenta}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleAccount(item)}
      >
        <Ionicons name="ios-add-circle-outline" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  const onSavePressed = async (data) => {
    // Obtener el id_cuenta de la cuenta padre y el nivel_cuenta
    const idCuentaPadre = selectedAccount[0].id_cuenta;
    const nivelCuenta = selectedAccount[0].nivel_cuenta + 1;

    // Agregar el id_cuenta de la cuenta padre y el nivel_cuenta a los datos
    data.padre_cuenta = idCuentaPadre;
    data.nivel_cuenta = nivelCuenta;

    console.log(data);

    try {
      // Realizar la solicitud HTTP para enviar los datos a la API
      const response = await fetch(
        "https://q20filkgq3.execute-api.us-east-1.amazonaws.com/dev/accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      // Si la solicitud se realizó con éxito, puedes hacer algo con la respuesta aquí
      const responseData = await response.json();
      console.log("Respuesta de la API:", responseData);
      // Después de enviar los datos con éxito, actualizar la lista y regresar a la página anterior
      route.params.updateList();
      goBack();
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      style={styles.root}
    >
      <View style={styles.container}>
        {selectedAccount.length === 0 ? (
          <View style={styles.customerDetails}>
            {errorMessage !== "Cantidad invalida" ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <CustomInputText
              name="search"
              placeholder="Insert a name or code or empty for list all"
              label="Search"
              control={control}
              handleInputChange={(text) => setSearchQuery(text)}
            />
            <CustomButton text={"Search"} onPress={handleSearch} />
          </View>
        ) : null}
        <View style={styles.containerCol}>
          {selectedAccount.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 400 }]}>
              <View style={[styles.itemContainer, { marginRight: 1 }]}>
                <View style={styles.itemDetails}>
                  <Text style={[styles.title, { alignSelf: "center" }]}>
                    Father
                  </Text>
                  <View
                    style={[styles.containerRow, { alignSelf: "baseline" }]}
                  >
                    <Text style={styles.itemName}>Name: </Text>
                    <Text style={styles.itemDescription}>
                      {selectedAccount[0].nombre_cuenta}
                    </Text>
                  </View>
                  <View
                    style={[styles.containerRow, { alignSelf: "baseline" }]}
                  >
                    <Text style={styles.itemName}>Code: </Text>
                    <Text style={styles.itemDescription}>
                      {selectedAccount[0].codigo_cuenta}
                    </Text>
                  </View>

                  <View style={styles.customerDetails}>
                    <Text style={[styles.title, { alignSelf: "center" }]}>
                      Child
                    </Text>
                    <CustomInputText
                      placeholder="Insert a code"
                      name="code"
                      label="Code"
                      disabled
                      control={control}
                      rules={{
                        required: "Code is required",
                      }}
                    />
                    <CustomInputText
                      placeholder="Insert a name"
                      name="name"
                      label="Name"
                      control={control}
                      rules={{
                        required: "Name is required",
                      }}
                      handleInputChange={() => clearError()}
                    />
                    <CustomButton
                      text={"Save"}
                      onPress={handleSubmit(onSavePressed)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : filteredAccounts.length !== 0 ? (
            <View style={[styles.customerDetails, { height: 300 }]}>
              <FlatList
                data={filteredAccounts.sort((a, b) =>
                  a.codigo_cuenta.localeCompare(b.codigo_cuenta)
                )}
                renderItem={renderAccountList}
                keyExtractor={(item) => item.id_cuenta.toString()}
              />
            </View>
          ) : (
            <View style={styles.customerDetails}>
              <Text>Search an account</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default NewAccountForm;
