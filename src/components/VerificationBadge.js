import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const VerificationBadge = ({status, icon, style}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: 2, ...style}}>
      {status ? (
        <MaterialIcons name="verified" color={Colors.primary} size={20} />
      ) : (
        <Octicons name="issue-opened" color={Colors.black} size={20} />
      )}
      {!icon && (
        <Text
          style={{
            color: status ? Colors.primary : Colors.black,
            marginLeft: 5,
          }}>
          {status ? 'Verified' : 'Not Verified'}
        </Text>
      )}
    </View>
  );
};

export default VerificationBadge;
