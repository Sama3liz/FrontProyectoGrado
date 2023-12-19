import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/styles";

const CustomInputNumber = ({
  control,
  name,
  rules = {},
  placeholder,
  handleInputChange,
  defaultValue,
  disabled,
  showDecimals = true,
  label,
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
              styles.inputContainer,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <Text style={[styles.label, { color: error ? "red" : "black" }]}>
              {label}
            </Text>
            <TextInput
              type="numeric"
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
                if (isValidNumber(text)) {
                  onChange(text);
                  if (handleInputChange) {
                    handleInputChange(text);
                  }
                }
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              keyboardType="numeric"
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

export default CustomInputNumber;
