import React from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Colors from './src/config/Colors';
// import messaging from '@react-native-firebase/messaging';
import HomeStack from './src/navigation/HomeStack';
import auth from '@react-native-firebase/auth';
// import {updateFcmToken} from './src/apis/auth/auth';
// const socket = io(
//   'http://67c1-2409-4050-e81-87f1-7838-315b-b676-2ecd.ngrok.io',
//   {
//     query: {token: auth().currentUser.email},
//     path: '/socket.io',
//   },
//   {
//     forceNew: true,
//   },
//   {
//     transports: ['websocket', 'polling', 'flashsocket'],
//   },
// );

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

  //socket imp
  // React.useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('socket connected', socket.id); // "G5p5..."
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('socket disconnected');
  //     socket.connect();
  //   });
  // }, [socket]);
  //end socket

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
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

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
