import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Animated,
  PermissionsAndroid,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import Colors from '../config/Colors';
import RoundedButton from '../components/RoundedButton';

import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

const Preview = ({navigation, route}) => {
  const card = route?.params?.card;
  const {titleFormat, textFormat, taglineFormat} = card?.format;
  const position = card?.position;

  const viewRef = React.useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        ToastAndroid.show('Card saved successfully.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {card ? (
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, backgroundColor: Colors.primary}}
            ref={viewRef}>
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
          </View>

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
            <RoundedButton label="Save" onPress={downloadImage} />
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
