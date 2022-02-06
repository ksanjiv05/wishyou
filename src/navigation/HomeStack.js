import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNav from './TabNav';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Message from '../screens/Message';
import EditCard from '../screens/EditCard';
import Preview from '../screens/Preview';
import Colors from '../config/Colors';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Feedback from '../screens/Feedback';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function HomeStack({user}) {
  // const [user, setUser] = React.useState(null);
  // async function onAuthStateChanged(user) {
  //   console.log('++++++++++++++++auth state changed+++++++++++++');
  //   if (user) {
  //     setUser(user);
  //   }
  // }

  // React.useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
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
          <Stack.Screen
            name="Message"
            component={Message}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
          />
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
            name="Settings"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: Colors.primary},
              headerTintColor: Colors.white,
            }}
            component={Settings}
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
