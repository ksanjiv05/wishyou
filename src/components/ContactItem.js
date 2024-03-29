import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import default_male from '../../assets/images/default-male.jpg';
import {shareLink} from '../config/Routes';

const openSms = async phoneNumber => {
  const url = `sms:${phoneNumber}?body=I use Wish You App to share wishing cards to my loved ones like you. Download Now 👉 ${shareLink}`;
  await Linking.openURL(url);
};

const ContactItem = ({item, invite}) => {
  return (
    <TouchableOpacity>
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
          <Image
            source={item.image ? {uri: item.image} : default_male}
            style={{
              backgroundColor: Colors.black,
              borderRadius: 100,
              width: 50,
              height: 50,
            }}
          />
        </View>
        <View style={{flex: 1, width: 50}}>
          <Text style={{textTransform: 'capitalize', color: Colors.black}}>
            {item?.name}
          </Text>
          <Text style={{color: Colors.black}}>{item.phone}</Text>
        </View>
        {invite && (
          <View
            style={{
              flex: 1,
              maxWidth: 60,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Pressable onPress={() => openSms(item.phone)}>
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
            </Pressable>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;
