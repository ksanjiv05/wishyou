import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import Colors from '../config/Colors';
import {ColorPicker} from 'react-native-color-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../config/Fonts';

const ToolBox = ({
  setShowToolBox,
  showToolBox,
  toolActions,
  showColor,
  setShowColor,
}) => {
  const [fonts, setFonts] = React.useState([]);

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

    return () => {
      setFonts([]);
    };
  }, []);

  return (
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
            showsHorizontalScrollIndicator={false}
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

export default ToolBox;
