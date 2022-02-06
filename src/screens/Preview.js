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
  Share,
} from 'react-native';
import Colors from '../config/Colors';
import RoundedButton from '../components/RoundedButton';
import IconButton from '../components/IconButton';

import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import auth from '@react-native-firebase/auth';
import {saveCard} from '../apis/card';
import {showToast} from '../utils/toast';
import {saveWishCard} from '../apis/wish-card';
import Loader from '../components/Loader';
import ShareView from '../components/ShareView';

const Preview = ({navigation, route}) => {
  const card = route?.params?.card;
  const {titleFormat, textFormat, taglineFormat} = card?.format;
  const position = card?.position;
  const [isLoading, setIsLoading] = React.useState(false);
  const [shareView, setShareView] = React.useState(false);

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

  const share = async () => {
    //open
    setIsLoading(true);
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          showToast('Please grant permission to save file.');
          return;
        }
      }

      const formData = new FormData();
      formData.append('file', {
        name: 'wishyou.png',
        type: 'image/png',
        uri,
      });

      formData.append('uid', auth().currentUser.email);
      formData.append('wishyou', 'test2@gmail.com');
      formData.append('tag', 'mothers day');

      const res = await saveWishCard(formData);
      if (!res) {
        showToast('Unable to share card');
        setIsLoading(false);
        return;
      }
      if (res && res.status === 200) {
        console.log('share able Link -', res.data.link);
        Share.share({message: res.data.link});
        showToast('You can share your card.');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error to share', error);
    }
  };

  // download image
  const downloadImage = async () => {
    setIsLoading(true);
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          showToast('Please provide permission to save file.');
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        ToastAndroid.show('Card saved successfully.', ToastAndroid.LONG);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    setIsLoading(true);
    const data = {
      uid: auth().currentUser.email,
      tag: "Mother's Day",
      title: card.text.title,
      text: card.text.text,
      tagline: card.text.tagline,
      background: card.background,
      format: card.format,
      position: {
        title: {
          x:
            typeof card.position.title.x === 'object'
              ? card.position.title.x?.__getValue()
              : card.position.title.x,
          y:
            typeof card.position.title.y === 'object'
              ? card.position.title.y?.__getValue()
              : card.position.title.y,
        },
        text: {
          x:
            typeof card.position.text.x === 'object'
              ? card.position.text.x?.__getValue()
              : card.position.text.x,
          y:
            typeof card.position.text.y === 'object'
              ? card.position.text.y?.__getValue()
              : card.position.text.y,
        },
        tagline: {
          x:
            typeof card.position.tagline.x === 'object'
              ? card.position.tagline.x?.__getValue()
              : card.position.tagline.x,
          y:
            typeof card.position.tagline.y === 'object'
              ? card.position.tagline.y?.__getValue()
              : card.position.tagline.y,
        },
      },
    };

    const res = await saveCard(data);
    if (!res) {
      showToast('Unable to save your card! Please try again.');
      setIsLoading(false);
      return;
    }
    if (res && res.status === 200) {
      console.log(res.data);
      showToast('Your card is saved successfully.');
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      {isLoading && <Loader text="Processing..." />}
      {shareView && <ShareView />}
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
            <IconButton icon="download" onPress={downloadImage} />
            <RoundedButton label="Save" onPress={saveData} />
            <RoundedButton label="Send" onPress={() => setShareView(true)} />
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
