import {TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({onPress, icon}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        borderRadius: 30,
        backgroundColor: Colors.white,
      }}>
      <MaterialCommunityIcons name={icon} size={30} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default IconButton;
