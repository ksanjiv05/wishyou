import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Colors from '../config/Colors';

const CardItem = ({onPress, card, active}) => {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

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
          source={{uri: card?.background}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width - 20,
            height: height / 4 - 40,
          }}
        />
      )}
      <Text style={{color: Colors.black, fontWeight: '700'}}>{card?.name}</Text>
      <Text style={{color: Colors.lightBlack}}>{card?.info}</Text>
    </TouchableOpacity>
  );
};

export default CardItem;
