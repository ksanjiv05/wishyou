import React from 'react';
import {List} from 'react-native-paper';
import Colors from '../config/Colors';

function NotificationCard({title = '', descp = ''}) {
  return (
    <List.Item
      title={title}
      titleStyle={{
        color: Colors.primary,
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: '600',
      }}
      description={descp}
      descriptionStyle={{color: Colors.primary}}
      left={props => <List.Icon {...props} icon="bell" />}
      style={{
        borderRadius: 5,
        marginVertical: 3,
        backgroundColor: Colors.cardColor,
        marginLeft: 0,
        // paddingLeft: 0,
      }}
    />
  );
}

export default NotificationCard;
