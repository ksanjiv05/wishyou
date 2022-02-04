import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../config/Colors';

function NotificationCard({title = '', descp = ''}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{descp}</Text>
    </View>
  );
}

export default NotificationCard;
