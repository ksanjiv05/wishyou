import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import CategoryItem from '../components/CategoryItem';
import CardItem from '../components/CardItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/Colors';
import {getCards} from '../apis/card';
import {getCategories} from '../apis/category/category';

function Home({navigation}) {
  const [selected, setSelected] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [tempCards, setTempCards] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  async function fetchData() {
    const responce = await getCards({skip: 0});
    if (responce && responce.status === 200) {
      setCards(responce.data.cards);
      setTempCards(responce.data.cards);
      setRefresh(false);
    }
  }
  async function fetchCategory() {
    const responce = await getCategories({skip: 0});
    if (responce && responce.status === 200) {
      setCategories(responce.data.categories);
      setSelected(responce.data.categories[0].tag);
    }
  }

  React.useEffect(() => {
    fetchCategory();
    fetchData();
  }, [refresh]);

  const onSelect = tag => {
    setSelected(tag);
    if (tag === 'ALL') {
      setTempCards(cards);
      return;
    }
    const filterCard = cards.filter(card => card.tag === tag);
    setTempCards(filterCard);
  };

  const renderCategories = () => {
    return (
      <>
        <View style={{paddingVertical: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.tag}
            data={categories}
            renderItem={({item}) => (
              <CategoryItem
                onPress={() => onSelect(item.tag)}
                active={selected === item?.tag}
                category={item}
              />
            )}
          />
        </View>
      </>
    );
  };

  const renderCards = () => {
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <FlatList
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item._id}
          data={tempCards}
          renderItem={({item}) => (
            <CardItem
              onPress={() => setSelectedCard(item?._id)}
              active={selectedCard === item._id}
              card={item}
            />
          )}
        />
      </View>
    );
  };

  const editCard = () => {
    if (!selectedCard) {
      ToastAndroid.show('Please select a card to edit.', ToastAndroid.LONG);
    } else {
      const card = tempCards.filter(c => c._id === selectedCard);
      navigation.push('EditCard', {card: card[0]});
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 20,
          backgroundColor: Colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 22}}>
          Wish You
        </Text>
      </View>
      {/**render categories */}
      {renderCategories()}

      {/**render cards */}
      <View style={{flex: 1}}>{renderCards()}</View>

      {/**edit button */}
      <TouchableOpacity
        onPress={editCard}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          height: 60,
          width: 60,
          backgroundColor: Colors.primary,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name="edit" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
