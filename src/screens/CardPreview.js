import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {getCard} from '../apis/wish-card';
import Loader from '../components/Loader';
import {showToast} from '../utils/toast';
import Colors from '../config/Colors';
import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {likeCard} from '../apis/card';
import auth from '@react-native-firebase/auth';

const CardPreview = ({route}) => {
  const {_id} = route.params;
  const [card, setCard] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const viewRef = React.useRef();

  const fetchCard = async () => {
    setIsLoading(true);
    const res = await getCard('?userCardId=' + _id);
    if (res && res.status === 200) {
      setCard(res?.data?.userCard);
      setIsLiked(res?.data?.userCard?.like);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showToast('Unanle to fetch card data');
    }
  };

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

  // download card
  const download = async () => {
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
        showToast('Card saved successfully.');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  let timer;
  const likeOrDislike = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      setIsLiked(!isLiked);
      if (!isLiked) {
        showToast('You liked this card.');
      } else {
        showToast('You disliked this card.');
      }
      const res = await likeCard(
        `?userCardId=${card?._id}&like=${
          auth().currentUser.displayName
        }&title=${card?.title}`,
      );
      if (res?.status === 200) {
        //
      } else {
        showToast('Something went wrong.');
      }
    }, 300);
  };

  React.useEffect(() => {
    fetchCard();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {isLoading && <Loader />}
      {card ? (
        <View style={{flex: 1, backgroundColor: Colors.white}} ref={viewRef}>
          <ImageBackground
            source={{uri: card?.background}}
            style={{
              flex: 1,
            }}
            resizeMode="cover">
            {/**title render */}
            <View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: parseInt(card?.position?.titleline?.x)},
                  {translateY: parseInt(card?.position?.titleline?.y)},
                ],
              }}>
              <Text
                style={{
                  color: card?.format?.titleFormat?.color,
                  fontSize: card?.format?.titleFormat?.fontSize,
                  fontFamily: card?.format?.titleFormat?.fontFamily,
                  textAlign: card?.format?.titleFormat?.textAlign,
                  fontWeight: card?.format?.titleFormat?.bold
                    ? 'bold'
                    : 'normal',
                }}>
                {card?.title}
              </Text>
            </View>
            {/**text render */}
            <View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: parseInt(card?.position?.textline?.x)},
                  {translateY: parseInt(card?.position?.textline?.y)},
                ],
              }}>
              <Text
                style={{
                  color: card?.format?.textFormat?.color,
                  fontSize: card?.format?.textFormat?.fontSize,
                  fontFamily: card?.format?.textFormat?.fontFamily,
                  textAlign: card?.format?.textFormat?.textAlign,
                  fontWeight: card?.format?.textFormat?.bold
                    ? 'bold'
                    : 'normal',
                }}>
                {card?.text}
              </Text>
            </View>
            {/**tagline render */}
            <View
              style={{
                paddingVertical: 12,
                transform: [
                  {translateX: parseInt(card?.position?.tagline?.x)},
                  {translateY: parseInt(card?.position?.tagline?.y)},
                ],
              }}>
              <Text
                style={{
                  color: card?.format?.taglineFormat?.color,
                  fontSize: card?.format?.taglineFormat?.fontSize,
                  fontFamily: card?.format?.taglineFormat?.fontFamily,
                  textAlign: card?.format?.taglineFormat?.textAlign,
                  fontWeight: card?.format?.taglineFormat?.bold
                    ? 'bold'
                    : 'normal',
                }}>
                {card?.tagline}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.white,
                position: 'absolute',
                fontSize: 10,
                bottom: 0,
                right: '50%',
                transform: [{translateX: 85}],
                backgroundColor: Colors.primary,
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 5,
              }}>
              {'From : ' + card?.uid}
            </Text>
          </ImageBackground>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: Colors.lightBlack}}>Card not found!</Text>
        </View>
      )}
      {card && (
        <>
          <TouchableOpacity
            onPress={download}
            style={{
              position: 'absolute',
              bottom: 95,
              right: 20,
              height: 60,
              width: 60,
              backgroundColor: Colors.primary,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="download" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={likeOrDislike}
            style={{
              position: 'absolute',
              bottom: 30,
              right: 20,
              height: 60,
              width: 60,
              backgroundColor: isLiked ? Colors.white : Colors.primary,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: isLiked ? Colors.lightGray : Colors.primary,
            }}>
            <FontAwesome
              name="heart"
              size={20}
              color={isLiked ? Colors.primary : Colors.white}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CardPreview;
