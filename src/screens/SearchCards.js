import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchCards = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 5,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} color={Colors.white} />
        </TouchableOpacity>
        <TextInput
          style={{flexGrow: 1}}
          placeholder="Search wishing cards..."
          placeholderTextColor={Colors.lightGray}
          autoFocus={true}
        />
        <TouchableOpacity style={{marginLeft: 10}}>
          <FontAwesome name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchCards;
