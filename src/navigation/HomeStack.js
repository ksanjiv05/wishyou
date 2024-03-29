import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';

import Login from '../screens/Login';
import Register from '../screens/Register';
import EditCard from '../screens/EditCard';
import Preview from '../screens/Preview';
import Colors from '../config/Colors';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Feedback from '../screens/Feedback';
import CardPreview from '../screens/CardPreview';
import WishYouSpecial from '../screens/WishYouSpecial';
import SearchCards from '../screens/SearchCards';

const Stack = createNativeStackNavigator();

function HomeStack({user}) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {user ? (
        <>
          <Stack.Screen name="Tab" component={TabNav} />
          <Stack.Screen
            name="EditCard"
            options={{
              headerShown: true,
              title: 'Add Your Text',
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            component={EditCard}
          />
          <Stack.Screen
            name="Preview"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            component={Preview}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            name="Contacts"
            component={Contacts}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="Feedback"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            component={Feedback}
          />
          <Stack.Screen
            name="Card Preview"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            component={CardPreview}
          />
          <Stack.Screen
            name="WishYouSpecial"
            options={{
              headerShown: true,
              title: 'Wish You Special',
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
              animation: 'none',
            }}
            component={WishYouSpecial}
          />
          <Stack.Screen
            name="SearchCards"
            options={{
              animation: 'slide_from_right',
            }}
            component={SearchCards}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default HomeStack;
