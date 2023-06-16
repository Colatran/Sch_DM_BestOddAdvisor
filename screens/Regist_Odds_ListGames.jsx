import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { available_oddTypes, db } from '../firebase.config';

import Input_Search from '../components/Input_Search';
import ListItem_Game from '../components/ListItem_Game';

import { linkGames } from '../utils/Links';
import { styles_common } from '../styles/styles_common';



export default function Regist_Odds_ListGames({ route, navigation }) {
  const { sport } = route.params;

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  
  const ref_odds = collection(db, available_oddTypes);

  

  //Get Games
  useEffect(() => {
    getDocs(ref_odds)
    .then((query) => {
      // Get oddTypes
      const oddTypes = [];
      query.docs.forEach((doc) => {
        const data = doc.data();
        if(data.available) oddTypes.push(data.type);
      });
      // Get games
      fetch(linkGames(sport, oddTypes))
      .then(response => response.json())
      .then(data => setGames(data));
    });
  }, []);



  const onChangeSearch = (text) => {
    const filteredItems = games.filter((item) =>
      item.away_team.toLowerCase().includes(text.toLowerCase()) ||
      item.home_team.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredItems);
    setSearch(text);
  }

  const onPress = (item) => {
    navigation.navigate('Odds', { game: item });
  }



  return (
    <View style={styles_common.container}>

      <Input_Search
        value={search}
        onChange={onChangeSearch}
      />

      <FlatList 
        data={search.trim() === "" ? games : filtered} 
        renderItem={({item}) => 
          <ListItem_Game item={item} onPress={() => onPress(item)}/> 
        }
    />

    </View>
  );
}