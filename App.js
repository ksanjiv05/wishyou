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
// import messaging from '@react-native-firebase/messaging';

import HomeStack from './src/navigation/HomeStack';
import auth from '@react-native-firebase/auth';
// import {updateFcmToken} from './src/apis/auth/auth';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
        <HomeStack user={user} />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
