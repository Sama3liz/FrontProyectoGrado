import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../styles/styles";

const CustomInputText = ({
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
      defaultValue={defaultValue ? defaultValue : ""}
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.void}>
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
              type="text"
              disabled={disabled ? true : false}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                if (handleInputChange) {
                  handleInputChange(text);
                }
              }}
              onBlur={onBlur}
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
        </View>
      )}
    />
  );
};

export default CustomInputText;
