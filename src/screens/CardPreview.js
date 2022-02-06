import {View, Text, Animated, ImageBackground} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import {getCard} from '../apis/wish-card';
import Loader from '../components/Loader';
import {showToast} from '../utils/toast';

const CardPreview = ({route}) => {
  const {_id} = route.params;
  const [card, setCard] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchCard = async () => {
    setIsLoading(true);
    const res = await getCard('?userCardId=' + _id);
    if (res && res.status === 200) {
      setCard(res?.data?.userCard);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showToast('Unanle to fetch card data');
    }
  };

  React.useEffect(() => {
    fetchCard();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>
      {isLoading && <Loader />}
      {card ? (
        <ImageBackground
          source={{uri: card?.background}}
          style={{flex: 1, width: '100%'}}
          resizeMode="cover">
          {/**title render */}
          <View
            style={{
              paddingVertical: 12,
              transform: [
                {translateX: parseInt(card?.position?.title?.x)},
                {translateY: parseInt(card?.position?.title?.y)},
              ],
            }}>
            <Text
              style={{
                color: card?.format?.titleFormat?.color,
                fontSize: card?.format?.titleFormat?.fontSize,
                fontFamily: card?.format?.titleFormat?.fontFamily,
                textAlign: card?.format?.titleFormat?.textAlign,
                fontWeight: card?.format?.titleFormat?.bold ? 'bold' : 'normal',
              }}>
              {card?.text?.title}
            </Text>
          </View>
          {/**text render */}
          <View
            style={{
              paddingVertical: 12,
              transform: [
                {translateX: parseInt(card?.position?.text?.x)},
                {translateY: parseInt(card?.position?.text?.y)},
              ],
            }}>
            <Text
              style={{
                color: card?.format?.textFormat?.color,
                fontSize: card?.format?.textFormat?.fontSize,
                fontFamily: card?.format?.textFormat?.fontFamily,
                textAlign: card?.format?.textFormat?.textAlign,
                fontWeight: card?.format?.textFormat?.bold ? 'bold' : 'normal',
              }}>
              {card?.text?.text}
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
              {card?.text?.tagline}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <Text>No Card Found!</Text>
      )}
    </View>
  );
};

export default CardPreview;
