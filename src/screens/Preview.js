import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Colors from '../config/Colors';

const Preview = ({navigation, route}) => {
  const card = route?.params?.card;
  const {titleFormat, textFormat, taglineFormat} = card?.format;
  const position = card?.position;

  return (
    <>
      {card ? (
        <View style={{flex: 1}}>
          <ImageBackground source={{uri: card?.background}} style={{flex: 1}}>
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
            <TouchableOpacity
              style={{
                paddingHorizontal: 50,
                paddingVertical: 15,
                borderRadius: 30,
                backgroundColor: Colors.white,
              }}>
              <Text style={{color: Colors.primary, fontWeight: '700'}}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingHorizontal: 50,
                paddingVertical: 15,
                borderRadius: 30,
                backgroundColor: Colors.white,
              }}>
              <Text style={{color: Colors.primary, fontWeight: '700'}}>
                Share
              </Text>
            </TouchableOpacity>
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
