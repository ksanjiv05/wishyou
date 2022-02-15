import React from 'react';
import {View, FlatList, TextInput, Text} from 'react-native';
import {getWishCards} from '../apis/wish-card';
import CardItem from '../components/CardItem';
import Loader from '../components/Loader';
import Colors from '../config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RoundedButton from '../components/RoundedButton';
import auth from '@react-native-firebase/auth';
import {showToast} from '../utils/toast';
import {deleteCard} from '../apis/wish-card';

function WishYou({navigation}) {
  const [refresh, setRefresh] = React.useState(false);
  const [wishes, setWishes] = React.useState([]);
  const [filteredWish, setFilteredWish] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchWishes() {
    wishes?.length === 0 && setLoading(true);
    const response = await getWishCards(
      '?uid=' + auth().currentUser.email + '&skip=0',
    );
    if (response && response.status === 200) {
      setWishes(response.data.userCards);
      setFilteredWish(response.data.userCards);
      setRefresh(false);
      setLoading(false);
    } else {
      setLoading(false);
      setRefresh(false);
    }
  }

  const removeCard = async id => {
    const res = await deleteCard('?userCardId=' + id);
    if (res && res.status === 200) {
      showToast('Card removed successfully.');
      const newWishes = wishes.filter(item => item._id !== id);
      setWishes(newWishes);
      setFilteredWish(newWishes);
    } else {
      showToast('Unable to remove card.');
    }
  };

  const fetchMore = async () => {
    const response = await getWishCards(
      '?uid=' + auth().currentUser.email + '&skip=' + wishes.length,
    );
    if (response && response.status === 200) {
      setWishes(prev => [...prev, ...response.data.userCards]);
      setFilteredWish(prev => [...prev, ...response.data.userCards]);
      setRefresh(false);
    } else {
      setLoading(false);
      setRefresh(false);
    }
  };

  const searchCard = text => {
    const new_data = wishes.filter(
      item =>
        item.text.includes(text) ||
        item.title.includes(text) ||
        item.uid.includes(text),
    );

    setFilteredWish(new_data);
  };

  React.useEffect(() => {
    fetchWishes();
  }, [refresh]);

  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
      <View>
        <TextInput
          placeholder="Search Your contact"
          placeholderTextColor={Colors.gray}
          style={{
            borderRadius: 5,
            color: Colors.black,
            backgroundColor: Colors.white,
            paddingRight: 10,
            paddingVertical: 15,
            paddingLeft: 50,
          }}
          onChangeText={text => searchCard(text)}
        />
        <MaterialIcons
          name="search"
          size={25}
          color={Colors.gray}
          style={{position: 'absolute', top: 18, left: 10}}
        />
      </View>

      {/**render cards */}
      {filteredWish?.length > 0 && (
        <View style={{marginHorizontal: 20, paddingTop: 5, flex: 1}}>
          <FlatList
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            keyExtractor={item => item._id}
            data={filteredWish}
            renderItem={({item}) => (
              <CardItem
                onPress={() =>
                  navigation.navigate('Card Preview', {_id: item._id})
                }
                card={item}
                reverse={true}
                removeCard={removeCard}
              />
            )}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMore}
          />
        </View>
      )}
      {filteredWish?.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: Colors.lightBlack, marginBottom: 30}}>
            No one shared you any card yet!
          </Text>
          <RoundedButton
            label="Refresh"
            style={{backgroundColor: Colors.primary}}
            textStyle={{color: Colors.white}}
            onPress={() => setRefresh(true)}
          />
        </View>
      )}
    </View>
  );
}

export default WishYou;
