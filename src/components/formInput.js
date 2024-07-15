import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import theme from '../utils/theme';
import {ShowPassword, HidePassword} from '../assets/svg';

/**
 * FormInput
 * 
 * This component is a customizable form input field for React Native applications.
 * It supports text and password input types, and integrates with react-hook-form for form validation.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.control - The control object from react-hook-form.
 * @param {Object} props.errors - The errors object from react-hook-form.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {Object} props.style - The custom style object for the input field.
 * @param {Object} props.validationRules - The validation rules for the input field.
 * @param {string} props.type - The type of the input field, either 'text' or 'password'.
 * @param {Object} props.rest - Any other props passed to the input field.
 * @returns {React.Element} The rendered form input component.
 */

const FormInput = ({ control, errors, name, label, placeholder, style, validationRules, type = 'text', ...rest }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  const toggleSecureEntry = () => {
    if (type === 'password') {
      setSecureTextEntry(!secureTextEntry);
    }
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container]}>
        <Controller
          control={control}
          rules={validationRules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={theme.black}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              {...rest}
            />
          )}
          name={name}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
           {secureTextEntry ? <ShowPassword /> : <HidePassword />}
          </TouchableOpacity>
        )}
      </View>
      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.red,
    borderWidth: 1,
    marginBottom: 12,
    paddingRight: 12,
    borderRadius: 10
  },
  label: {
    fontSize: 17,
    color: theme.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
 input: {
    flex: 1,
    color: theme.black,
    padding: 12,
  },
  icon: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default FormInput;
