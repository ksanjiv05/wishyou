import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';

const RoundedButton = ({onPress, label, style, textStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 30,
        backgroundColor: Colors.white,
        ...style,
      }}>
      <Text style={{color: Colors.primary, fontWeight: '700', ...textStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
