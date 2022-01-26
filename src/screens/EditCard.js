import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  PanResponder,
} from 'react-native';

import Colors from '../config/Colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeModal from 'react-native-modal';

const EditCard = ({navigation, route}) => {
  const card = route?.params?.card;
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [showToolBox, setShowToolBox] = React.useState(false);

  const titlePan = React.useRef(new Animated.ValueXY()).current;
  const titlePanResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        titlePan.setOffset({
          x: titlePan.x._value,
          y: titlePan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: titlePan.x, dy: titlePan.y},
      ]),
      onPanResponderRelease: () => {
        titlePan.flattenOffset();
        console.log(titlePan);
      },
    }),
  ).current;

  const textPan = React.useRef(new Animated.ValueXY()).current;
  const textPanResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        textPan.setOffset({
          x: textPan.x._value,
          y: textPan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: textPan.x, dy: textPan.y},
      ]),
      onPanResponderRelease: () => {
        textPan.flattenOffset();
        console.log(textPan);
      },
    }),
  ).current;

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
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [{translateX: titlePan.x}, {translateY: titlePan.y}],
            }}>
            <TextInput
              style={{
                color: Colors.black,
                fontSize: 20,
                fontFamily: 'BeautifulPeoplePersonalUse-dE0g',
                textAlign: 'center',
              }}
              placeholder="Wish Title"
              placeholderTextColor={Colors.lightBlack}
              multiline={true}
              defaultValue={card?.name}
            />
            <View
              {...titlePanResponder.panHandlers}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
                borderRadius: 5,
                right: 30,
                top: 35,
                borderColor: Colors.lightGray,
                borderWidth: 1,
              }}>
              <Feather name="move" size={20} color={Colors.primary} />
            </View>
          </Animated.View>

          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [{translateX: textPan.x}, {translateY: textPan.y}],
            }}>
            <TextInput
              style={{
                color: Colors.lightBlack,
                fontFamily: 'Anything-9Y9jy',
                textAlign: 'center',
              }}
              defaultValue={card?.info}
              multiline={true}
              placeholder="Your wishes goes here..."
              placeholderTextColor={Colors.lightBlack}
            />
            <View
              {...textPanResponder.panHandlers}
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.5,
                borderRadius: 5,
                right: 30,
                top: 35,
                borderColor: Colors.lightGray,
                borderWidth: 1,
              }}>
              <Feather name="move" size={20} color={Colors.primary} />
            </View>
          </Animated.View>
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
          onPress={() => setShowToolBox(true)}
          style={{
            padding: 10,
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}>
          <MaterialCommunityIcons
            name="format-textbox"
            size={30}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}>
          <Text style={{color: Colors.primary, fontWeight: '700'}}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingVertical: 15,
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}>
          <Text style={{color: Colors.primary, fontWeight: '700'}}>Share</Text>
        </TouchableOpacity>
      </View>

      {/**tool box */}
      <ReactNativeModal
        swipeDirection="down"
        hasBackdrop={false}
        onSwipeComplete={() => setShowToolBox(false)}
        isVisible={showToolBox}
        style={{margin: 0}}>
        <View
          style={{
            padding: 10,
            position: 'absolute',
            bottom: 0,
            height: 250,
            backgroundColor: Colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: '100%',
          }}>
          <Text style={{color: 'white'}}>Toolbox</Text>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default EditCard;
