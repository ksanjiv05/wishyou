import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';

const RoundedButton = ({onPress, label}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: Colors.white,
      }}>
      <Text style={{color: Colors.primary, fontWeight: '700'}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
