import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/styles";

const CustomSearchInput = ({
  control,
  name,
  label,
  rules = {},
  placeholder,
  secureTextEntry,
  handleInputChange,
  defaultValue,
  disabled,
}) => {
  return (
    <Controller
      defaultValue={defaultValue || ""}
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const isError = !!error;
        return (
          <View style={[styles.void, isError && { borderColor: "red" }]}>
            <View
              style={[
                styles.inputContainer,
                { borderColor: isError ? "red" : "#e8e8e8" },
              ]}
            >
              <Text
                style={[styles.label, { color: isError ? "red" : "black" }]}
              >
                {label}
              </Text>
              <TextInput
                type="text"
                disabled={disabled}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange && handleInputChange(text);
                }}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {isError && (
              <Text style={{ color: "red", alignSelf: "stretch" }}>
                {error.message || "Error"}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default CustomSearchInput;
