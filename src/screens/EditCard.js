import React from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Animated,
  PanResponder,
  LogBox,
  Dimensions,
} from 'react-native';

import Colors from '../config/Colors';
import Fonts from '../config/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToolBox from '../components/ToolBox';
import RoundedButton from '../components/RoundedButton';
import IconButton from '../components/IconButton';
import MoveIcon from '../components/MoveIcon';
import Routes from '../config/Routes';

const cardURL = Routes.url + Routes.ver + Routes.card + '?cardId=';

LogBox.ignoreAllLogs();

const EditCard = ({navigation, route}) => {
  const card = route?.params?.card;
  console.log('edit card ', card);
  const [showToolBox, setShowToolBox] = React.useState(false);
  const [selectedLine, setSelectedLine] = React.useState('title');
  const [showColor, setShowColor] = React.useState(false);
  const [title, setTitle] = React.useState(card?.name);
  const [text, setText] = React.useState(card?.info);
  const [tagline, setTagline] = React.useState('You additonal text...');
  const [position, setPosition] = React.useState({
    title: {x: 10, y: 10},
    text: {x: 10, y: 10},
    tagline: {x: 10, y: 10},
  });
  const height = Dimensions.get('window').height;

  {
    /**title formatting */
  }
  const [titleFormat, setTitleFormat] = React.useState({
    bold: false,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: '',
  });

  {
    /**text formatting */
  }
  const [textFormat, setTextFormat] = React.useState({
    bold: false,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: '',
  });

  {
    /**tagline formatting */
  }
  const [taglineFormat, setTaglineFormat] = React.useState({
    bold: false,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: '',
  });

  const titlePan = React.useRef(new Animated.ValueXY(position.title)).current;
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
        setPosition(prev => ({...prev, title: {x: titlePan.x, y: titlePan.y}}));
      },
    }),
  ).current;

  const textPan = React.useRef(new Animated.ValueXY(position.text)).current;
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
        setPosition(prev => ({...prev, text: {x: textPan.x, y: textPan.y}}));
      },
    }),
  ).current;

  const taglinePan = React.useRef(
    new Animated.ValueXY(position.tagline),
  ).current;
  const taglinePanResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        taglinePan.setOffset({
          x: taglinePan.x._value,
          y: taglinePan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: taglinePan.x, dy: taglinePan.y},
      ]),
      onPanResponderRelease: () => {
        taglinePan.flattenOffset();
        setSelectedLine('tagline');
        setPosition(prev => ({
          ...prev,
          tagline: {x: taglinePan.x, y: taglinePan.y},
        }));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, bold: !prev.bold}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, textAlign: 'left'}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, textAlign: 'center'}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, textAlign: 'right'}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, fontSize: parseInt(size)}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, fontFamily: Fonts[family]}));
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
          case 'tagline':
            setTaglineFormat(prev => ({...prev, color: `${color}`}));
            break;
        }

        setShowColor(false);
      },
    }),
    [selectedLine],
  );

  const handlePreview = () => {
    const previewData = {
      background: cardURL + card?._id,
      position: position,
      format: {titleFormat, textFormat, taglineFormat},
      text: {title, text, tagline},
    };
    navigation.navigate('Preview', {card: previewData});
  };

  return (
    <View style={{flex: 1}}>
      {/**full card with background */}

      <ImageBackground
        style={{flex: 1, width: '100%'}}
        resizeMode="cover"
        source={{uri: cardURL + card?._id}}>
        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}
          contentContainerStyle={{
            height: height - height / 5,
          }}>
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
              value={title}
              onChangeText={value => setTitle(value)}
              onFocus={() => setSelectedLine('title')}
            />
            <MoveIcon mover={titlePanResponder.panHandlers} />
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
              value={text}
              onChangeText={value => setText(value)}
              multiline={true}
              placeholder="Your wishes goes here..."
              placeholderTextColor={Colors.lightBlack}
              onFocus={() => setSelectedLine('text')}
            />
            <MoveIcon mover={textPanResponder.panHandlers} />
          </Animated.View>

          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [
                {translateX: taglinePan.x},
                {translateY: taglinePan.y},
              ],
            }}>
            <TextInput
              style={{
                color: taglineFormat.color,
                fontSize: taglineFormat.fontSize,
                fontFamily: taglineFormat.fontFamily,
                textAlign: taglineFormat.textAlign,
                fontWeight: taglineFormat.bold ? 'bold' : 'normal',
              }}
              value={tagline}
              onChangeText={value => setTagline(value)}
              multiline={true}
              placeholder="Some tagline"
              placeholderTextColor={Colors.lightBlack}
              onFocus={() => setSelectedLine('tagline')}
            />
            <MoveIcon mover={taglinePanResponder.panHandlers} />
          </Animated.View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      {/**button to save or share */}
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: Colors.primary,
          height: 80,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <IconButton
          onPress={() => setShowToolBox(true)}
          icon="format-textbox"
        />
        <IconButton onPress={() => {}} icon="upload" />
        <RoundedButton onPress={handlePreview} label="Preview" />
      </View>

      <ToolBox
        toolActions={toolActions}
        showColor={showColor}
        showToolBox={showToolBox}
        setShowColor={setShowColor}
        setShowToolBox={setShowToolBox}
      />
    </View>
  );
};

export default EditCard;
