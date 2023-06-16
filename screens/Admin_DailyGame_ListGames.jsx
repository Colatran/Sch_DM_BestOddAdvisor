import { FlatList, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { available_oddTypes, dailyGames, db } from '../firebase.config';

import Input_Boolean from '../components/Input_Boolean';
import Input_Search from '../components/Input_Search';
import ListItem from '../components/ListItem';

import { linkGames } from '../utils/Links';
import { android_ripple_style, styles_common, styles_item } from '../styles/styles_common';
import ListItem_Game_Time from '../components/ListItem_Game_Time';
import ListItem_Game_Teams_Stack from '../components/ListItem_Game_Teams_Stack';



export default function Admin_DailyGame_ListGames({ route, navigation }) {
  const { sport } = route.params;

  const [games, setGames] = useState([]);
  const [dailyDocs, setDailyDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(games);
  
  const ref_games = collection(db, dailyGames);
  const ref_odds = collection(db, available_oddTypes);



  //Get Docs
  useEffect(() => {
    return onSnapshot(ref_games, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDailyDocs(data);
    });
  }, []);

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
  


  const findGame = (key) => {
    return dailyDocs.find((obj) => obj.key === key);
  }

  const isGameAvailable = (key) => {
    if(findGame(key)) return true;
    else return false;
  }

  const addGame = async (game) => {
    await addDoc(ref_games, {
      key: game.id,
      sport: sport,
      home_team: game.home_team,
      away_team: game.away_team,
      commence_time: game.commence_time,
    });
  }

  const deleteGame = async (key) => {
    const foundObj = findGame(key);
    const docRef = doc(ref_games, foundObj.id);
    await deleteDoc(docRef);
  }

  const switchGame = async (game) => {
    const foundObj = findGame(game.id);

    if(foundObj) {
      const docRef = doc(ref_games, foundObj.id);
      await deleteDoc(docRef);
    }
    else {
      addGame(game);
    }
  }



  const onChangeSearch = (text) => {
    const filteredItems = games.filter((item) =>
      item.away_team.toLowerCase().includes(text.toLowerCase()) ||
      item.home_team.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredItems);
    setSearch(text);
  }

  const onPress = (item) => {
    switchGame(item);
  }
  const onPressOn = (item) => {
    addGame(item);
  }
  const onPressOff = (item) => {
    deleteGame(item.id);
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
          <ListItem 
            util={
              <View style={styles_item.pressable_center}>
                <Input_Boolean
                  onPressOn={() => onPressOn(item)} 
                  onPressOff={() => onPressOff(item)}
                  on={isGameAvailable(item.id)}
                />
              </View>
            }
            body={
              <Pressable 
                style={[styles_item.pressable_paddingLeft]}
                android_ripple={android_ripple_style}
                onPress={() => onPress(item)}
              >
                <ListItem_Game_Teams_Stack style={{flex: 2}} home_team={item.home_team} away_team={item.away_team}/>
                <ListItem_Game_Time style={{flex: 1}} commence_time={item.commence_time}/>
              </Pressable>
            }
          />
        }
      />
    </View>
  );
}
