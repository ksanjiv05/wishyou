import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Colors from '../config/Colors';

const CategoryItem = ({onPress, category, active}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: active ? Colors.primary : Colors.lightGray,
        borderRadius: 30,
        margin: 5,
      }}>
      <Text
        style={{
          color: active ? Colors.white : Colors.black,
          fontWeight: '700',
        }}>
        {category?.tagDisplayName}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
