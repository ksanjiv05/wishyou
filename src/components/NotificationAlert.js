import {TouchableOpacity, Text, Image, View} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import default_male from '../../assets/images/default-male.jpg';

const NotificationAlert = ({notification}) => {
  const [hide, setHide] = React.useState(true);

  React.useEffect(() => {
    if (notification.title) {
      setHide(false);
    }
  }, [notification]);
  return !hide ? (
    <TouchableOpacity
      onPress={() => setHide(true)}
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Image
        source={default_male}
        style={{height: 50, width: 50, borderRadius: 50}}
      />
      <View style={{paddingHorizontal: 10, overflow: 'hidden', width: '90%'}}>
        <Text
          numberOfLines={1}
          style={{fontSize: 14, color: Colors.black, fontWeight: '600'}}>
          {notification.title}
        </Text>
        <Text style={{fontSize: 12, color: Colors.lightBlack}}>
          {notification.body}
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default NotificationAlert;
