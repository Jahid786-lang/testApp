import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import Signup from '../screens/authentication/signUp';
import SignInScreen from '../screens/authentication/signin';
import Home from '../screens/home';
enableScreens();

const Stack = createNativeStackNavigator();

export default function RootNavigation () {
  return (
    <NavigationContainer initialRouteName={"Signup"}>
      <Stack.Navigator
       screenOptions={{
          headerStyle: {
            backgroundColor: '#df1f26',
          },
          headerTintColor: 'yellow',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={SignInScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};