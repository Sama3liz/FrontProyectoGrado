import React, { useContext, useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import CustomModal from "../components/Modal/CustomModal";
import DataTableComponent from "../components/DataTables/DataTable";

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const { logOut, user } = useContext(AuthContext);
  const onLogOutPress = () => {
    logOut();
  };
  return (
    <View style={styles.centeredView}>
      <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 10 }}>
        Hello, {user.payload.name}
      </Text>
      <CustomModal visible={visible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </CustomModal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <DataTableComponent/>
      <Text
        onPress={onLogOutPress}
        style={{
          width: "100%",
          textAlign: "center",
          color: "red",
          marginTop: "auto",
          marginVertical: 20,
          fontSize: 20,
        }}
      >
        Sign out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
