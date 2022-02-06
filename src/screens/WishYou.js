import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {getWishCards} from '../apis/wish-card';

import Colors from '../config/Colors';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

function WishYou({navigation}) {
  const [wishes, setWishes] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  const [tempWishes, setTempWishes] = React.useState([]);

  async function fetchWishes(skip) {
    setLoader(true);
    const responce = await getWishCards(
      '?wishyou=test2@gmail.com&skip=' + skip,
    );
    if (responce && responce.status === 200) {
      console.log(
        'wishyou ---------------------',
        responce.data.wishYous.length,
      );
      setTempWishes(responce.data.wishYous);
      setWishes(responce.data.wishYous);
      setLoader(false);
    } else {
      setLoader(false);
    }
  }

  const searchCard = value => {
    console.log('search', value);
    const newWishs = wishes.filter(
      item => item.tag.includes(value) || item.uid.includes(value),
    );
    setTempWishes(newWishs);
  };

  React.useEffect(() => {
    setLoader(true);
    fetchWishes(0);
  }, []);

  async function loadMoreWishes(skip) {
    const responce = await getWishCards(
      '?wishyou=test2@gmail.com&skip=' + skip,
    );
    if (responce && responce.status === 200) {
      console.log(
        'wishyou ---------------------',
        responce.data.wishYous.length,
      );
      setTempWishes(responce.data.wishYous);
      setWishes(responce.data.wishYous);
    }
  }

  const renderCards = () => {
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item._id}
          data={tempWishes}
          refreshing={loader}
          onRefresh={() => fetchWishes(0)}
          renderItem={({item}) => {
            console.log('++++++++', item.cardLink);
            return (
              <ImageBackground
                source={{uri: item.cardLink + item._id}}
                style={{
                  width: width - 20,
                  height: height / 4,
                  borderColor: 'red',
                  backgroundColor: 'green',
                  marginTop: 5,
                }}
              />
            );
          }}
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            loadMoreResults(info);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          //   backgroundColor: Colors.primary,
        }}>
        <TextInput
          placeholder="Search Your contact"
          placeholderTextColor={Colors.lightBlack}
          style={{
            borderRadius: 5,
            color: Colors.primary,
            backgroundColor: Colors.white,
            paddingLeft: 10,
          }}
          onChangeText={searchCard}
        />
      </View>

      {/**render cards */}
      {loader ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>{renderCards()}</View>
      )}
    </View>
  );
}

export default WishYou;
