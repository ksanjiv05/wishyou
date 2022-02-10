import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import ProfileOptions from '../screens/ProfileOptions';
import Colors from '../config/Colors';
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
          title: 'Wishes',
          tabBarIcon: ({size, color, focused}) => (
            <Entypo
              name="slideshare"
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
          headerRight: () => (
            <TouchableOpacity style={{paddingRight: 10}}>
              <MaterialIcons
                name="stacked-bar-chart"
                style={{transform: [{rotate: '-4.72rad'}]}}
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
          ),
          title: 'Notifications',
          tabBarIcon: ({size, color, focused}) => (
            <MaterialIcons
              name="notifications"
              size={size + 5}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileOptions"
        component={ProfileOptions}
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
