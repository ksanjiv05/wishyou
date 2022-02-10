import * as React from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import NotificationCard from '../components/NotificationCard';
import messaging from '@react-native-firebase/messaging';
import {getNotifications} from '../apis/notification/notification';
import Colors from '../config/Colors';
import noNotification from '../../assets/images/no-notification.png';
import Loader from '../components/Loader';
import RoundedButton from '../components/RoundedButton';

const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchData() {
    notifications?.length === 0 && setIsLoading(true);
    const responce = await getNotifications('?uid=test2@gmail.com');
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
      console.log('_________new noti_________', remoteMessage);
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
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}
            resizeMode="center">
            <Text
              style={{
                color: Colors.lightBlack,
                marginBottom: 20,
              }}>
              No notifications found!
            </Text>
            <RoundedButton
              label="Refresh"
              style={{backgroundColor: Colors.primary}}
              textStyle={{color: Colors.white}}
              onPress={() => setRefresh(true)}
            />
          </ImageBackground>
        )}
      </View>
    </>
  );
};

export default Notifications;

// const styles = StyleSheet.create({})
