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
import RoundedButton from '../components/RoundedButton';

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
      setCategories([
        {_id: 'all', tag: 'all', tagDisplayName: 'All'},
        {
          _id: 'wish-you-special',
          tag: 'wish-you-special',
          tagDisplayName: 'Wish You Special',
        },
        ...responce.data.categories,
      ]);
      setSelected('all');
    }
  }

  React.useEffect(() => {
    fetchCategory();
    fetchData();
  }, [refresh]);

  const onSelect = tag => {
    setSelected(tag);
    if (tag === 'all') {
      setTempCards(cards);
      return;
    }
    if (tag === 'wish-you-special') {
      navigation.navigate('WishYouSpecial');
      return;
    }
    const filterCard = cards.filter(card => card.tag === tag);
    setTempCards(filterCard);
  };

  const renderCategories = () => {
    return (
      <>
        <View style={{paddingVertical: 10, backgroundColor: Colors.white}}>
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
      <View
        style={{
          paddingVertical: 10,
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
        }}>
        {tempCards?.length > 0 ? (
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
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: Colors.lightBlack, marginBottom: 30}}>
              Cards are coming soon...
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
          paddingHorizontal: 15,
          backgroundColor: Colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: Colors.white, fontWeight: '500', fontSize: 22}}>
          Wish You
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchCards')}>
          <FontAwesome name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {/**render categories */}
      {renderCategories()}

      {/**render cards */}
      <View style={{flex: 1}}>{renderCards()}</View>

      {/**edit button */}
      {tempCards?.length > 0 && (
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
      )}
    </View>
  );
}

export default Home;
