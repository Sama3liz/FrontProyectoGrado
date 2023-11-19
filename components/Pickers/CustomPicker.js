import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  control,
  name,
  rules = {},
  defaultValue,
  able,
  options = [],
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <Picker
              enabled={able}
              style={styles.input}
              selectedValue={value}
              onValueChange={(value) => onChange(value)}
            >
              {options.map((x) => {
                return <Picker.Item label={x} value={x} />;
              })}
            </Picker>
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 0,
    marginVertical: 5,
  },
  input: {},
});

export default CustomPicker;
