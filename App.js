import React from 'react';
import {
  StatusBar,
  View,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Colors from './src/config/Colors';
import messaging from '@react-native-firebase/messaging';
import HomeStack from './src/navigation/HomeStack';
import auth from '@react-native-firebase/auth';
import {updateFcmToken} from './src/apis/auth/auth';
import NotificationAlert from './src/components/NotificationAlert';

export const GlobalContext = React.createContext();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [notification, setNotifcation] = React.useState({});

  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      const tok = await auth().currentUser.getIdToken();
    } else {
      setUser(null);
    }

    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    SplashScreen.hide();
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      //
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotifcation(remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    user &&
      messaging()
        .getToken()
        .then(token => {
          updateFcmToken({fcmToken: token, email: auth().currentUser?.email});
        })
        .catch(err => {
          console.log('unable to get token', err);
        });
    // return messaging().onTokenRefresh(token => {
    //   updateFcmToken({fcmToken: token, email: auth().currentUser.email});
    // });
  }, [user]);

  if (initializing)
    return (
      <ActivityIndicator
        color={Colors.white}
        style={{flex: 1, backgroundColor: Colors.primary}}
      />
    );

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <NotificationAlert notification={notification} />
      <NavigationContainer>
        <View style={{flex: 1}}>
          <GlobalContext.Provider value={{socket: null}}>
            <HomeStack user={user} />
          </GlobalContext.Provider>
        </View>
      </NavigationContainer>
    </View>
  );
};

export default App;

//cEiJzcljSjKMJMkqx20AfC:APA91bHrTI0_QqvQPcOAfKeZYagiqo1pqIDf8Qsr60xvDCo2R6uqxzYdNxTV4k60SBEo0V1arjQALiyViNDD_tYE-H4OW9T25uRWOr3M1WYCCylbRByCAoEqD-vWklPo7QHi-RPr47Io
