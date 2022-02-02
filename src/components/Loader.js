import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';

const Loader = ({text}) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 500,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={Colors.primary} size="large" />
      <Text
        style={{
          color: Colors.black,
          marginTop: 50,
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default Loader;
