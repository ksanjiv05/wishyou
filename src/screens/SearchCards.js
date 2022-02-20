import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardItem from '../components/CardItem';
import Loader from '../components/Loader';
import {searchCards} from '../apis/card';
import {showToast} from '../utils/toast';

const SearchCards = ({navigation}) => {
  const [cards, setCards] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const findCards = async search => {
    Keyboard.dismiss();
    setIsLoading(true);
    const res = await searchCards(`?search=${searchText}`);
    if (res?.status === 200) {
      setCards(res?.data?.cards);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setCards([]);
    }
  };

  const editCard = selected => {
    if (!selected) {
      showToast('Please select a card to edit.');
    } else {
      const card = cards.filter(c => c._id === selected);
      navigation.push('EditCard', {card: card[0]});
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 4,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={Colors.white} />
        </TouchableOpacity>
        <TextInput
          style={{flexGrow: 1}}
          placeholder="Search wishing cards..."
          placeholderTextColor={Colors.lightGray}
          autoFocus={true}
          returnKeyType="search"
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={event => findCards(event.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={() => findCards(searchText)}
          style={{marginLeft: 10}}>
          <FontAwesome name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          padding: isLoading ? 0 : 20,
        }}>
        {isLoading && <Loader text="Searching..." />}
        {cards?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            keyExtractor={item => item._id}
            data={cards}
            renderItem={({item}) => (
              <CardItem onPress={() => editCard(item?._id)} card={item} />
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: Colors.lightBlack, marginBottom: 30}}>
              No cards found for your search!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchCards;
