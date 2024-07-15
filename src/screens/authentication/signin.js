import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '../../components/button';
import FormInput from '../../components/formInput';
import theme from '../../utils/theme';

const Signin = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onChange'});

  const onSubmit = async data => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser !== null) {
        const parsedUser = JSON.parse(storedUser);
        if (
          data.email === parsedUser.email &&
          data.password === parsedUser.password
        ) {
          navigation.navigate('Home', {user: parsedUser});
        } else {
          Alert.alert('Invalid Credentials', 'Email or password is incorrect.');
        }
      } else {
        Alert.alert('No User Found', 'Please sign up first.');
      }
    } catch (error) {
      console.error('Failed to retrieve data from AsyncStorage', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        title={'Signin'}
        disabled={!isValid}
        onPressButton={handleSubmit(onSubmit)}
      />
      <View style={styles.signUpRowStyle}>
            <Text
              style={{
                color: theme.black,
              }}
            >
              {"Don’t have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signUp}>{"SignUp"}</Text>
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

export default Signin;
