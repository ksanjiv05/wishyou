import React from 'react';
import {View, FlatList, TextInput} from 'react-native';
import {getWishCards} from '../apis/wish-card';
import CardItem from '../components/CardItem';
import Colors from '../config/Colors';

function WishYou({navigation}) {
  const [refresh, setRefresh] = React.useState(false);
  const [wishes, setWishes] = React.useState([]);

  async function fetchWishes() {
    const response = await getWishCards('?uid=sanjiv@gmail.com&skip=0');
    if (response && response.status === 200) {
      setWishes(response.data.userCards);
      setRefresh(false);
    }
  }

  const fetchMore = async () => {
    const response = await getWishCards(
      '?uid=sanjiv@gmail.com&skip=' + wishes.length,
    );
    if (response && response.status === 200) {
      setWishes(prev => [...prev, ...response.data.userCards]);
      setRefresh(false);
    }
  };

  React.useEffect(() => {
    fetchWishes();
  }, [refresh]);

  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput
          placeholder="Search Your contact"
          placeholderTextColor={Colors.lightBlack}
          style={{
            borderRadius: 5,
            color: Colors.primary,
            backgroundColor: Colors.white,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        />
      </View>

      {/**render cards */}
      <View style={{marginHorizontal: 20, paddingTop: 5, flex: 1}}>
        <FlatList
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item._id}
          data={wishes}
          renderItem={({item}) => (
            <CardItem
              onPress={() =>
                navigation.navigate('Card Preview', {_id: item._id})
              }
              card={item}
              reverse={true}
            />
          )}
          onEndReachedThreshold={0.1}
          onEndReached={fetchMore}
        />
      </View>
    </View>
  );
}

export default WishYou;
