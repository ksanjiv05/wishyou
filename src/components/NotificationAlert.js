import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';

const NotificationAlert = ({notification}) => {
  return (
    <View
      style={{
        position: 'absolute',
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.primary,
      }}>
      <Text>{notification.title}</Text>
      <Text>{notification.content}</Text>
    </View>
  );
};

export default NotificationAlert;
