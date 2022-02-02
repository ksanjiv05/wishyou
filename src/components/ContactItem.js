import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';

const ContactItem = ({item}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={() =>
        //navigation.navigate('Message')
        console.log('presseds', item)
      }>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxHeight: 60,
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            maxWidth: 60,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.black,
              borderRadius: 100,
              width: 50,
              height: 50,
            }}></View>
        </View>
        <View style={{flex: 1, width: 50}}>
          <Text style={{textTransform: 'capitalize', color: Colors.black}}>
            sanjiv kumar
          </Text>
          <Text style={{color: Colors.black}}>12/03/2020</Text>
        </View>
        <View
          style={{
            flex: 1,
            maxWidth: 60,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              color: Colors.primary,
              backgroundColor: Colors.white,
              borderRadius: 8,
              textAlign: 'center',
            }}>
            Invite
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;
