import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Message from '../screens/Message';
import EditCard from '../screens/EditCard';
import Colors from '../config/Colors';
import Contacts from '../screens/Contacts';

const Stack = createNativeStackNavigator();

function HomeStack({user}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="Tab" component={TabNav} />

          {/* <Stack.Screen
            name="Notifications"
            options={{
              title: 'Notifications',
            }}
            component={Notifications}
          /> */}
          <Stack.Screen name="Message" component={Message} />
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
          <Stack.Screen name="Contacts" component={Contacts} />
        </>
      ) : (
        <>
          {/* <Stack.Screen name="Scan" component={QRScanner} /> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default HomeStack;
