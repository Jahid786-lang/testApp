import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/formInput';
import ButtonComponent from '../../components/button';
import theme from '../../utils/theme';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onChange'});

  const onSubmit = async data => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Failed to save the data to AsyncStorage', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FormInput
        control={control}
        errors={errors}
        name="firstName"
        placeholder="First Name"
        label="First Name"
        style={styles.input}
        validationRules={{
          required: 'First name is required',
        }}
      />
      <FormInput
        control={control}
        errors={errors}
        name="lastName"
        placeholder="Last Name"
        label="Last Name"
        style={styles.input}
        validationRules={{
          required: 'Last name is required',
        }}
      />

      <FormInput
        control={control}
        errors={errors}
        name="email"
        placeholder="Email"
        label="Email Address"
        style={styles.input}
        validationRules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Invalid email address',
          },
        }}
        keyboardType="email-address"
      />

      <FormInput
        control={control}
        errors={errors}
        name="password"
        label="Password"
        placeholder="Password"
        style={styles.input}
        type="password"
        validationRules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }}
      />

      <ButtonComponent
        title={'Sign Up'}
        disabled={!isValid}
        onPressButton={handleSubmit(onSubmit)}
      />

        <View style={styles.signUpRowStyle}>
            <Text
              style={{
                color: theme.black,
              }}
            >
              {"Already have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
            >
              <Text style={styles.signUp}>{"Login"}</Text>
            </TouchableOpacity>
          </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  signUpRowStyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
  },
  signUp: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 3,
    color: theme.red,
  },
});

export default SignUpScreen;
