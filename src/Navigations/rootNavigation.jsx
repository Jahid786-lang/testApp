import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Signup from '../screens/authentication/signUp';
import SignInScreen from '../screens/authentication/signin';
import Home from '../screens/home';
import Settings from '../screens/settings';
import Profile from '../screens/profile';
import {FlatList, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
enableScreens();

function CustomDrawerToggle({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu" size={30} color="yellow" style={{marginLeft: 10}} />
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
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
    </Stack.Navigator>
  );
}

function HomeTabs({navigation}) {
  return (
    <Tab.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        headerShown: true,
        headerLeft: () => <CustomDrawerToggle navigation={navigation} />,
        headerStyle: {
          backgroundColor: '#df1f26',
        },
        headerTintColor: 'yellow',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the corresponding icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#df1f26',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

const drawerContents = [
  {
    name: 'Home',
    component: HomeTabs,
    title: 'home',
  },
  {
    name: 'Settings',
    component: Settings,
    title: 'settings',
  },
  {
    name: 'Profile',
    component: Profile,
    title: 'person',
  },
];

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <FlatList
        data={drawerContents}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(item.name)}
            style={{flexDirection: 'row', alignItems: 'center', left: 10}}>
            <Icon
              name={item.title}
              size={25}
              color="#df1f26"
              style={{margin: 5}}
            />
            <Text style={{color: '#df1f26', marginLeft: 30, fontSize: 20}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#df1f26',
        },
        headerTintColor: 'yellow',
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
