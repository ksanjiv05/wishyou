import * as React from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import NotificationCard from '../components/NotificationCard';
import messaging from '@react-native-firebase/messaging';
import {getNotifications} from '../apis/notification/notification';
import Colors from '../config/Colors';
import noNotification from '../../assets/images/no-notification.png';
import Loader from '../components/Loader';

const Notifications = ({navigation}) => {
  const uid = auth().currentUser.email;
  const [notifications, setNotifications] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchData() {
    notifications?.length === 0 && setIsLoading(true);
    const responce = await getNotifications('?uid=' + uid);
    if (responce && responce.status === 200) {
      setNotifications(responce.data.notifications);
      setRefresh(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [refresh]);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('_________new noti_________', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <View
        style={{
          flex: 1,
        }}>
        {notifications?.length > 0 ? (
          <FlatList
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            data={notifications}
            renderItem={({item, index}) => {
              return <NotificationCard key={index} item={item} />;
            }}
          />
        ) : (
          <ImageBackground
            source={noNotification}
            style={{flex: 1, backgroundColor: Colors.white}}
            resizeMode="center">
            <Text
              style={{
                color: Colors.lightBlack,
                position: 'absolute',
                top: '65%',
                left: '30%',
              }}>
              No notifications found!
            </Text>
          </ImageBackground>
        )}
      </View>
    </>
  );
};

export default Notifications;

// const styles = StyleSheet.create({})
