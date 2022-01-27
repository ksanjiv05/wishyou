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

function Home({navigation}) {
  const [selected, setSelected] = React.useState('382438');
  const [selectedCard, setSelectedCard] = React.useState(null);

  const categories = [
    {
      name: "Mother's Day",
      id: '382438',
    },
    {
      name: "Father's Day",
      id: '83327843',
    },
    {
      name: 'Propose Day',
      id: '3237032',
    },
    {
      name: 'Hug Day',
      id: '38230',
    },
    {
      name: 'Kiss Day',
      id: '892373',
    },
    {
      name: 'Valentine Day',
      id: '234324',
    },
  ];

  const cards = [
    {
      name: "Wish You - Mother's Day 01",
      id: '8327323',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://previews.123rf.com/images/jaboy/jaboy1503/jaboy150300582/37885953-d%C3%ADa-de-la-madre-clavel-s-fondo.jpg',
    },
    {
      name: "Wish You - Mother's Day 02",
      id: '832323',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://png.pngtree.com/thumb_back/fw800/background/20190415/pngtree-simple-symmetrical-hand-painted-mothers-day-carnation-bar-background-image_103805.jpg',
    },
    {
      name: "Wish You - Mother's Day 03",
      id: '8323123',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20201229/pngtree-romantic-pink-carnation-background-image_517870.jpg',
    },
    {
      name: "Wish You - Mother's Day 04",
      id: '8323231',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://img.freepik.com/free-photo/mother-s-day-valentine-s-day-background-design-concept-with-pink-carnation-flower_315337-2182.jpg?size=626&ext=jpg',
    },
    {
      name: "Wish You - Mother's Day 05",
      id: '8321323',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi17HchLM0mD-ujKeCPSj5RuJcv3z2hqnNCwcd5VMpE2ddXX2Lk3o8kfnoNebchW27yqQ&usqp=CAU',
    },
    {
      name: "Wish You - Mother's Day 06",
      id: '8312323',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://img5.goodfon.com/wallpaper/nbig/3/1b/fon-rozovyi-pink-flowers-eustoma-eustoma-gift-box-hearts-lov.jpg',
    },
  ];

  const renderCategories = () => {
    return (
      <>
        <View style={{paddingVertical: 10, paddingLeft: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={categories}
            renderItem={({item}) => (
              <CategoryItem
                onPress={() => setSelected(item?.id)}
                active={selected === item?.id}
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
          keyExtractor={item => item.id}
          data={cards}
          renderItem={({item}) => (
            <CardItem
              onPress={() => setSelectedCard(item?.id)}
              active={selectedCard === item.id}
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
      const card = cards.filter(c => c.id === selectedCard);
      navigation.push('EditCard', {card: card[0]});
    }
  };

  return (
    <View style={{flex: 1}}>
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
          padding: 20,
          backgroundColor: Colors.primary,
          borderRadius: 50,
        }}>
        <FontAwesome name="edit" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
