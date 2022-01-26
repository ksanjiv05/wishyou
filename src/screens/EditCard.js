import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Animated,
  PanResponder,
  LogBox,
  StyleSheet,
  FlatList,
} from 'react-native';

import Colors from '../config/Colors';
import Fonts from '../config/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeModal from 'react-native-modal';
import {ColorPicker} from 'react-native-color-picker';

LogBox.ignoreAllLogs();

const EditCard = ({navigation, route}) => {
  const card = route?.params?.card;
  const [showToolBox, setShowToolBox] = React.useState(false);
  const [selectedLine, setSelectedLine] = React.useState('title');
  const [showColor, setShowColor] = React.useState(false);
  const [fonts, setFonts] = React.useState([]);

  {
    /**title formatting */
  }
  const [titleFormat, setTitleFormat] = React.useState({
    bold: false,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.ANYTHING,
  });

  {
    /**text formatting */
  }
  const [textFormat, setTextFormat] = React.useState({
    bold: false,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.CASSANDRA_PERSONAL_USE_REGULAR,
  });

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
        setSelectedLine('title');
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
        setSelectedLine('text');
      },
    }),
  ).current;

  const toolActions = React.useMemo(
    () => ({
      handleBold: () => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, bold: !prev.bold}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, bold: !prev.bold}));
            break;
        }
      },
      handleLeftAlign: () => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, textAlign: 'left'}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, textAlign: 'left'}));
            break;
        }
      },
      handleCenterAlign: () => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, textAlign: 'center'}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, textAlign: 'center'}));
            break;
        }
      },
      handleRightAlign: () => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, textAlign: 'right'}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, textAlign: 'right'}));
            break;
        }
      },
      handleFontSize: size => {
        size = parseInt(size) <= 0 || size === '' ? 20 : size;
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, fontSize: parseInt(size)}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, fontSize: parseInt(size)}));
            break;
        }
      },
      handleFontFamily: family => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, fontFamily: Fonts[family]}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, fontFamily: Fonts[family]}));
            break;
        }
      },
      handleColor: color => {
        switch (selectedLine) {
          case 'title':
            setTitleFormat(prev => ({...prev, color: `${color}`}));
            break;
          case 'text':
            setTextFormat(prev => ({...prev, color: `${color}`}));
            break;
        }

        setShowColor(false);
      },
    }),
    [selectedLine],
  );

  {
    /**load fonts */
  }
  React.useEffect(() => {
    const _fonts = Object.keys(Fonts).map(font => {
      return {
        id: Math.random().toString(32).substring(5),
        name: Fonts[font],
        value: font,
      };
    });

    setFonts(_fonts);
  }, []);

  return (
    <View style={{flex: 1}}>
      {/**full card with background */}
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          style={{flex: 1}}
          resizeMode="cover"
          source={{uri: card?.background}}>
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [{translateX: titlePan.x}, {translateY: titlePan.y}],
            }}>
            <TextInput
              style={{
                color: titleFormat.color,
                fontSize: titleFormat.fontSize,
                fontFamily: titleFormat.fontFamily,
                textAlign: titleFormat.textAlign,
                fontWeight: titleFormat.bold ? 'bold' : 'normal',
              }}
              placeholder="Wish Title"
              placeholderTextColor={Colors.lightBlack}
              multiline={true}
              defaultValue={card?.name}
              onFocus={() => setSelectedLine('title')}
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
                color: textFormat.color,
                fontSize: textFormat.fontSize,
                fontFamily: textFormat.fontFamily,
                textAlign: textFormat.textAlign,
                fontWeight: textFormat.bold ? 'bold' : 'normal',
              }}
              defaultValue={card?.info}
              multiline={true}
              placeholder="Your wishes goes here..."
              placeholderTextColor={Colors.lightBlack}
              onFocus={() => setSelectedLine('text')}
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
        backdropOpacity={0}
        onBackdropPress={() => setShowToolBox(false)}
        onSwipeComplete={() => setShowToolBox(false)}
        isVisible={showToolBox}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            padding: 10,
            bottom: 0,
            height: 200,
            backgroundColor: Colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: '100%',
          }}>
          {/**top tap */}
          <View
            style={{
              width: 50,
              height: 2,
              backgroundColor: Colors.white,
              borderRadius: 10,
              opacity: 0.5,
              alignSelf: 'center',
            }}
          />

          {/**tool */}
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.icon}
              onPress={toolActions.handleBold}>
              <MaterialCommunityIcons
                name="format-bold"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.iconLabel}>Bold</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowColor(true)}
              style={styles.icon}>
              <MaterialCommunityIcons
                name="format-color-fill"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.iconLabel}>Color</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={toolActions.handleLeftAlign}>
              <MaterialCommunityIcons
                name="format-align-left"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.iconLabel}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={toolActions.handleCenterAlign}>
              <MaterialCommunityIcons
                name="format-align-center"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.iconLabel}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={toolActions.handleRightAlign}>
              <MaterialCommunityIcons
                name="format-align-right"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.iconLabel}>Right</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 9,
                  width: 20,
                  marginRight: 5,
                }}>
                Font Size
              </Text>
              <TextInput
                placeholder="20"
                style={{
                  width: 60,
                  height: 40,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  color: Colors.primary,
                  paddingLeft: 10,
                }}
                keyboardType="number-pad"
                onChangeText={size => toolActions.handleFontSize(size)}
                placeholderTextColor={Colors.primary}
              />
            </View>
          </View>

          {/**fonts */}
          <View style={{marginTop: 5}}>
            <Text style={{paddingVertical: 8, fontSize: 12}}>Font Family</Text>
            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={fonts}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.fontItem}
                  onPress={() => toolActions.handleFontFamily(item.value)}>
                  <Text
                    style={{
                      fontFamily: Fonts[item.value],
                      color: Colors.primary,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {showColor && (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              padding: 20,
            }}>
            <ColorPicker
              onColorSelected={color => toolActions.handleColor(color)}
              style={{flex: 1}}
            />
          </View>
        )}
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: Colors.white,
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconLabel: {
    color: Colors.secondary,
    fontSize: 9,
  },
  fontItem: {
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

export default EditCard;
