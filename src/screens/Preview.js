import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Colors from '../config/Colors';
import RoundedButton from '../components/RoundedButton';

const Preview = ({navigation, route}) => {
  const card = route?.params?.card;
  const {titleFormat, textFormat, taglineFormat} = card?.format;
  const position = card?.position;

  const saveCard = () => {
    console.log(card);
  };

  return (
    <>
      {card ? (
        <View style={{flex: 1}}>
          <ImageBackground
            source={{uri: card?.background}}
            style={{flex: 1, width: '100%'}}
            resizeMode="cover">
            {/**title render */}
            <Animated.View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: position?.title?.x},
                  {translateY: position?.title?.y},
                ],
              }}>
              <Text
                style={{
                  color: titleFormat?.color,
                  fontSize: titleFormat?.fontSize,
                  fontFamily: titleFormat?.fontFamily,
                  textAlign: titleFormat?.textAlign,
                  fontWeight: titleFormat?.bold ? 'bold' : 'normal',
                }}>
                {card?.text?.title}
              </Text>
            </Animated.View>
            {/**text render */}
            <Animated.View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: position?.text?.x},
                  {translateY: position?.text?.y},
                ],
              }}>
              <Text
                style={{
                  color: textFormat?.color,
                  fontSize: textFormat?.fontSize,
                  fontFamily: textFormat?.fontFamily,
                  textAlign: textFormat?.textAlign,
                  fontWeight: textFormat?.bold ? 'bold' : 'normal',
                }}>
                {card?.text?.text}
              </Text>
            </Animated.View>
            {/**tagline render */}
            <Animated.View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: position?.tagline?.x},
                  {translateY: position?.tagline?.y},
                ],
              }}>
              <Text
                style={{
                  color: taglineFormat?.color,
                  fontSize: taglineFormat?.fontSize,
                  fontFamily: taglineFormat?.fontFamily,
                  textAlign: taglineFormat?.textAlign,
                  fontWeight: taglineFormat?.bold ? 'bold' : 'normal',
                }}>
                {card?.text?.tagline}
              </Text>
            </Animated.View>
          </ImageBackground>

          {/**buttons */}
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: Colors.primary,
              height: 80,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <RoundedButton label="Save" onPress={saveCard} />
            <RoundedButton label="Share" onPress={() => {}} />
          </View>
        </View>
      ) : (
        <ActivityIndicator
          style={{flex: 1, backgroundColor: Colors.white}}
          color={Colors.primary}
        />
      )}
    </>
  );
};

export default Preview;
