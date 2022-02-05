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

  // const categories = [
  //   {
  //     name: "Mother's Day",
  //     id: '382438',
  //   },
  //   {
  //     name: "Father's Day",
  //     id: '83327843',
  //   },
  //   {
  //     name: 'Propose Day',
  //     id: '3237032',
  //   },
  //   {
  //     name: 'Hug Day',
  //     id: '38230',
  //   },
  //   {
  //     name: 'Kiss Day',
  //     id: '892373',
  //   },
  //   {
  //     name: 'Valentine Day',
  //     id: '234324',
  //   },
  // ];

  // const cards = [
  //   {
  //     name: "Wish You - Mother's Day 01",
  //     id: '8327323',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://www.adobe.com/express/create/card/media_10cef0d3e63429bb6b57a2335c750bd4c4585470c.png?width=400&format=png&optimize=medium',
  //   },
  //   {
  //     name: "Wish You - Mother's Day 02",
  //     id: '832323',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://i.pinimg.com/originals/70/9d/dd/709dddfdfe7190c386a12f811f3b4abb.jpg',
  //   },
  //   {
  //     name: "Wish You - Mother's Day 03",
  //     id: '8323123',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://images.squarespace-cdn.com/content/v1/59c4bc67914e6b5ac397900e/1554993222636-V9PFOVLB97S8AYEOO9MO/Floral+bouquet+template+I.jpg?format=1000w',
  //   },
  //   {
  //     name: "Wish You - Mother's Day 04",
  //     id: '8323231',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoSRDLIKwpQjQBzWAgdkUiafLKPfOa8hHlLYz_-vEF-0xaH8yMhN0Ogp-RiwrRPVmgw6I&usqp=CAU',
  //   },
  //   {
  //     name: "Wish You - Mother's Day 05",
  //     id: '8321323',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi17HchLM0mD-ujKeCPSj5RuJcv3z2hqnNCwcd5VMpE2ddXX2Lk3o8kfnoNebchW27yqQ&usqp=CAU',
  //   },
  //   {
  //     name: "Wish You - Mother's Day 06",
  //     id: '8312323',
  //     info: "Wish You a very Happy Mother's Day...",
  //     background:
  //       'https://img5.goodfon.com/wallpaper/nbig/3/1b/fon-rozovyi-pink-flowers-eustoma-eustoma-gift-box-hearts-lov.jpg',
  //   },
  // ];

  async function fetchData() {
    const responce = await getCards({skip: 0});
    if (responce && responce.status === 200) {
      setCards(responce.data.cards);
      setTempCards(responce.data.cards);
    }
  }
  async function fetchCategory() {
    const responce = await getCategories({skip: 0});
    if (responce && responce.status === 200) {
      setCategories(responce.data.categories);
      setSelected(responce.data.categories[0]._id);
    }
  }
  React.useEffect(() => {
    fetchCategory();
    fetchData();
  }, []);

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
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: Colors.primary,
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
