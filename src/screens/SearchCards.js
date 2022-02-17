import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardItem from '../components/CardItem';
import Loader from '../components/Loader';

const SearchCards = ({navigation}) => {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const searchCards = async search => {
    Keyboard.dismiss();
    console.log(search);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 4,
          paddingHorizontal: 20,
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
          onSubmitEditing={event => searchCards(event.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={() => searchCards(searchText)}
          style={{marginLeft: 10}}>
          <FontAwesome name="search" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {isLoading && <Loader text="Searching..." />}
        {cards?.length > 0 ? (
          <FlatList
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            keyExtractor={item => item._id}
            data={cards}
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
              No cards found for your search!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchCards;
