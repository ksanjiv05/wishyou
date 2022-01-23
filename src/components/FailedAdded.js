import React from 'react';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FailedAdded = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View>
        <MaterialIcons name="error-outline" color="red" size={100} />
      </View>
      <Text style={{fontSize: 20, marginTop: 15}}>
        Failed to Add New Contact.
      </Text>
      <Text style={{fontSize: 16, marginTop: 10}}>Try Again!</Text>
    </View>
  );
};

export default FailedAdded;
