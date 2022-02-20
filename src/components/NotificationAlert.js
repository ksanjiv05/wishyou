import {TouchableOpacity, Text, Image, View} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

const NotificationAlert = ({notification}) => {
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    console.log(notification);
    if (notification.title) {
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 5000);
    }
  }, [notification]);
  return (
    <Modal
      isVisible={!hide}
      backdropOpacity={0.2}
      style={{
        padding: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <TouchableOpacity
        onPress={() => setHide(true)}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 15,
        }}>
        {notification?.imageUrl ? (
          <Image
            source={{uri: notification?.imageUrl}}
            style={{height: 50, width: 50, borderRadius: 50}}
          />
        ) : (
          <Entypo name="bell" size={50} color={Colors.primary} />
        )}
        <View style={{paddingHorizontal: 10, overflow: 'hidden', width: '90%'}}>
          <Text
            numberOfLines={1}
            style={{fontSize: 14, color: Colors.black, fontWeight: '600'}}>
            {notification.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{fontSize: 12, color: Colors.lightBlack}}>
            {notification.body}
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NotificationAlert;
