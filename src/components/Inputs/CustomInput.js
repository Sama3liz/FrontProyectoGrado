import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  handleInputChange,
  defaultValue,
  type,
  disabled,
  showDecimals = true,
}) => {
  return (
    <Controller
      defaultValue={defaultValue ? defaultValue : ""}
      control={control}
      name={name}
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
            <TextInput
              type={type ? type : "text"}
              disabled={disabled ? true : false}
              value={value}
              onChangeText={(text) => {
                const isValidNumber = (text) => {
                  if (showDecimals) {
                    return /^\d*\.?\d*$/.test(text); 
                  } else {
                    return /^\d+$/.test(text); 
                  }
                };
                if (
                  (type === "number" && isValidNumber(text)) ||
                  type !== "number"
                ) {
                  onChange(text);
                  if (handleInputChange) {
                    handleInputChange(text);
                  }
                }
              }}
              onBlur={() => {
                if (type === "number") {
                  const numericValue = parseFloat(value);
                  const formattedValue = showDecimals
                    ? isNaN(numericValue)
                      ? ""
                      : numericValue.toFixed(2)
                    : isNaN(numericValue)
                    ? ""
                    : numericValue.toString().replace(/\.\d*/, ""); 
                  onChange(formattedValue);
                }
                onBlur();
              }}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
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

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
