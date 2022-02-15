import React from 'react';
import {TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import Colors from '../config/Colors';
import Routes from '../config/Routes';
const cardURL = Routes.url + Routes.ver + Routes.card + '?cardId=';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItem = ({onPress, card, active, reverse, removeCard}) => {
  const height = Dimensions.get('screen').height;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        borderRadius: 10,
        borderColor: active ? Colors.primary : Colors.gray,
        padding: 10,
        borderWidth: 3,
        marginVertical: 5,
        backgroundColor: Colors.white,
        height: height / 4 - 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {card?.background !== '' && (
        <Image
          source={{uri: reverse ? card?.background : cardURL + card?._id}}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 50,
            height: 50,
            borderRadius: 5,
          }}
        />
      )}
      <Text numberOfLines={1} style={{color: Colors.black, fontWeight: '700'}}>
        {reverse ? card?.title : card?.name}
      </Text>
      <Text
        numberOfLines={1}
        style={{color: Colors.lightBlack, textAlign: 'center'}}>
        {reverse ? card?.text : card?.info}
      </Text>
      {reverse && (
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 5,
              top: 5,
              width: 50,
              height: 50,
              borderRadius: 30,
              backgroundColor: Colors.lightGray,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => removeCard(card?._id)}>
            <Icon name="trash-can" size={25} color={Colors.primary} />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.white,
              position: 'absolute',
              fontSize: 10,
              bottom: 0,
              right: 0,
              backgroundColor: Colors.primary,
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 5,
            }}>
            {reverse ? 'From : ' + card?.uid : ''}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CardItem;
