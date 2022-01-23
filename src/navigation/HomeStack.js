import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Message from '../screens/Message';

const Stack = createNativeStackNavigator();

function HomeStack({user}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          {/* <Stack.Screen name="Tab" component={TabNav} /> */}

          {/* <Stack.Screen
            name="Notifications"
            options={{
              title: 'Notifications',
            }}
            component={Notifications}
          /> */}
          <Stack.Screen name="Message" component={Message} />
          {/* <Stack.Screen name="Feedback" component={Feedback} /> */}
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
