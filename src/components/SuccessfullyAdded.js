import React from 'react';
import {Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SuccessfullyAdded = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View>
        <AntDesign name="checkcircleo" color="#37474f" size={100} />
      </View>
      <Text style={{fontSize: 20, marginTop: 15}}>
        Successfully Added New Contact.
      </Text>
      <Text style={{fontSize: 16, marginTop: 10}}>Thank You!</Text>
    </View>
  );
};

export default SuccessfullyAdded;
