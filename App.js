import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';
// import messaging from '@react-native-firebase/messaging';
import HomeStack from './src/navigation/HomeStack';
import auth from '@react-native-firebase/auth';
// import {updateFcmToken} from './src/apis/auth/auth';
const socket = io(
  'http://2f8e-2409-4050-e81-87f1-8dd5-dd02-7b4f-644e.ngrok.io',
  {
    query: {token: auth().currentUser.email},
    path: '/socket.io',
  },
  {
    forceNew: true,
  },
  {
    transports: ['websocket', 'polling', 'flashsocket'],
  },
);

export const GlobalContext = React.createContext();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      console.log(user);
    }

    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  React.useEffect(() => {
    console.log(
      '______________________________________________________________________',
    );
    socket.on('connect', () => {
      console.log('socket connected', socket.id); // "G5p5..."
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
      socket.connect();
    });

    return () => {
      console.log('+++++++++++++++++++++++unmount++++++++++++++++++++++');
    };
  }, [socket]);

  // React.useEffect(() => {
  //   user &&
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         console.log('your token ', token);
  //         updateFcmToken({fcmToken: token, email: user.email});
  //       })
  //       .catch(err => {
  //         console.log('unable to get token', err);
  //       });
  //   return messaging().onTokenRefresh(token => {
  //     console.log('token ref', token);
  //     updateFcmToken({fcmToken: token, email: user.email});
  //   });
  // }, [user]);
  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('__________________', remoteMessage);
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // const config = {
  //   screens: {
  //     AddContact: {
  //       path: 'addcontact/:id',
  //       parse: {
  //         id: id => `${id}`,
  //       },
  //     },
  //   },
  // };

  // const linking = {
  //   prefixes: ['https://mydigitalidentity.com', 'mydigitalidentity://'],
  //   config,
  // };

  if (initializing) return <ActivityIndicator />;

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <GlobalContext.Provider value={{socket}}>
          <HomeStack user={user} />
        </GlobalContext.Provider>
      </View>
    </NavigationContainer>
  );
};

export default App;
