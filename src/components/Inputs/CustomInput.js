import React from "react";
import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/styles";

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
              styles.input,
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
              style={styles.void}
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

export default CustomInput;
