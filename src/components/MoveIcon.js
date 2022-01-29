import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MoveIcon = ({mover}) => {
  return (
    <View
      {...mover}
      style={{
        position: 'absolute',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        right: 30,
        top: 35,
        padding: 5,
      }}>
      <TouchableOpacity>
        <MaterialCommunityIcons name="drag" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default MoveIcon;
