import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../config/Colors';
import timeAgo from '../utils/datetime';

function NotificationCard({item}) {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{marginLeft: 10}}>
        {item.icon && item.icon !== 'none' ? (
          <Image
            source={{uri: item.icon}}
            style={{width: 30, height: 30, borderRadius: 30}}
            resizeMode="cover"
          />
        ) : (
          <Entypo name="bell" size={30} color={Colors.primary} />
        )}
      </View>
      <View style={{marginRight: 20, marginLeft: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              color: Colors.black,
            }}>
            {item?.title}
          </Text>
          <Text style={{color: Colors.black, fontSize: 12}}>
            {timeAgo(item.createdAt)}
          </Text>
        </View>
        <Text numberOfLines={2} style={{color: Colors.lightBlack}}>
          {item?.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NotificationCard;
