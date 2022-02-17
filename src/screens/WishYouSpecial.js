import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Colors from '../config/Colors';
import Loader from '../components/Loader';
import SpecialCard from '../components/SpecialCard';

const WishYouSpecial = () => {
  const [specialCards, setSpecialCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {isLoading && <Loader />}
      {specialCards?.length > 0 ? (
        <FlatList
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item._id}
          data={specialCards}
          renderItem={({item}) => (
            <SpecialCard
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
            We are bringing special cards for you...
          </Text>
        </View>
      )}
    </View>
  );
};

export default WishYouSpecial;
