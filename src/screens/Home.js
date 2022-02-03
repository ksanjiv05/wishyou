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
        'https://www.adobe.com/express/create/card/media_10cef0d3e63429bb6b57a2335c750bd4c4585470c.png?width=400&format=png&optimize=medium',
    },
    {
      name: "Wish You - Mother's Day 02",
      id: '832323',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://i.pinimg.com/originals/70/9d/dd/709dddfdfe7190c386a12f811f3b4abb.jpg',
    },
    {
      name: "Wish You - Mother's Day 03",
      id: '8323123',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://images.squarespace-cdn.com/content/v1/59c4bc67914e6b5ac397900e/1554993222636-V9PFOVLB97S8AYEOO9MO/Floral+bouquet+template+I.jpg?format=1000w',
    },
    {
      name: "Wish You - Mother's Day 04",
      id: '8323231',
      info: "Wish You a very Happy Mother's Day...",
      background:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoSRDLIKwpQjQBzWAgdkUiafLKPfOa8hHlLYz_-vEF-0xaH8yMhN0Ogp-RiwrRPVmgw6I&usqp=CAU',
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
        <View style={{paddingVertical: 10}}>
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
        <TouchableOpacity>
          <FontAwesome name="bell" size={22} color={Colors.white} />
        </TouchableOpacity>
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
