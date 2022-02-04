import React from 'react';
import {View, Text, FlatList, TextInput, ToastAndroid} from 'react-native';

import CategoryItem from '../components/CategoryItem';
import Colors from '../config/Colors';

function WishYou({navigation}) {
  const [selected, setSelected] = React.useState('382438');
  const [selectedCard, setSelectedCard] = React.useState(null);

  const renderCards = () => {
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item.id}
          data={[]}
          renderItem={({item}) => (
            <View></View>
            // <CardItem
            //   onPress={() => setSelectedCard(item?.id)}
            //   active={selectedCard === item.id}
            //   card={item}
            // />
          )}
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
        />
      </View>

      {/**render cards */}
      <View style={{flex: 1}}>{renderCards()}</View>
    </View>
  );
}

export default WishYou;
