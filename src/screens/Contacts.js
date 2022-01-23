import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function Contacts({navigation}) {
  return (
    <View>
      <Text>Contact</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red'}}
        onPress={() => navigation.navigate('Message')}>
        <Text>alax@gmail.com</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Contacts;
