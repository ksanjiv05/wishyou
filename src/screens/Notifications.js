import * as React from 'react';
import {FlatList, View} from 'react-native';
import NotificationCard from '../components/NotificationCard';
import messaging from '@react-native-firebase/messaging';
import {getNotifications} from '../apis/notification/notification';

const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = React.useState([]);
  async function fetchData() {
    const responce = await getNotifications({skip: 0});
    if (responce && responce.status === 200) {
      setNotifications(responce.data.categories);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('_________new noti_________', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <FlatList
          data={notifications}
          renderItem={({item}) => {
            return <NotificationCard title="noti" descp="hii bro" />;
          }}
        />
      </View>
    </>
  );
};

export default Notifications;

// const styles = StyleSheet.create({})
