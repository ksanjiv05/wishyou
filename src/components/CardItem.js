import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Colors from '../config/Colors';
import Routes from '../config/Routes';
const cardURL = Routes.url + Routes.ver + Routes.card + '?cardId=';

const CardItem = ({onPress, card, active, reverse}) => {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  // console.log('_________', cardURL + card?._id);
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
        backgroundColor: Colors.lightGray,
        height: height / 4 - 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {card?.background !== '' && (
        <ImageBackground
          source={{uri: reverse ? card?.background : cardURL + card?._id}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width - 20,
            height: height / 4 - 40,
          }}
        />
      )}
      <Text style={{color: Colors.black, fontWeight: '700'}}>
        {reverse ? card?.title : card?.name}
      </Text>
      <Text style={{color: Colors.lightBlack, textAlign: 'center'}}>
        {reverse ? card?.text : card?.info}
      </Text>
    </TouchableOpacity>
  );
};

export default CardItem;
