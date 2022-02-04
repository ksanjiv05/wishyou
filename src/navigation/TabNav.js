import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Colors from '../config/Colors';
import RecentChatedContacts from '../screens/RecentChatedContacts';
import WishYou from '../screens/WishYou';
import Notifications from '../screens/Notifications';

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#37474f',
        tabBarStyle: {height: 55},
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Entypo
              name="flower"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WishYou"
        component={WishYou}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primary},
          headerTintColor: Colors.white,
          title: 'Wish You',
          tabBarIcon: ({size, color, focused}) => (
            <MaterialIcons
              name="contacts"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primary},
          headerTintColor: Colors.white,
          title: 'Notifications',
          tabBarIcon: ({size, color, focused}) => (
            <MaterialIcons
              name="notifications"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Entypo
              name="user"
              size={size}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// list - alt;
// vcard - o;
