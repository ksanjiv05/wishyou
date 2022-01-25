import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Colors from '../config/Colors';

const EditCard = ({navigation, route}) => {
  const card = route?.params?.card;
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  return (
    <View style={{flex: 1}}>
      {/**full card with background */}
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <ImageBackground
          style={{width: width - 40, height: height - height / 4}}
          resizeMode="cover"
          source={{uri: card?.background}}>
          <TextInput
            style={{
              color: Colors.black,
              marginTop: 50,
              marginLeft: 30,
              fontWeight: '800',
              fontSize: 20,
            }}
            multiline={true}
            defaultValue={card?.name}
          />

          <TextInput
            style={{color: Colors.lightBlack, marginLeft: 30, marginTop: 0}}
            defaultValue={card?.info}
            multiline={false}
          />
        </ImageBackground>
      </View>

      {/**button to save or share */}
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.primary,
          height: 80,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}>
          <Text style={{color: Colors.black, fontWeight: '700'}}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}>
          <Text style={{color: Colors.black, fontWeight: '700'}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditCard;
