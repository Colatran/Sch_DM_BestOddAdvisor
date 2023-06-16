import { StyleSheet, FlatList, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { dailyGames, db } from '../firebase.config';

import ListItem_Game from './ListItem_Game';
import { styles_text } from '../styles/styles_common';
import { color_header_grey35, color_shadow_elevation } from '../styles/colors';



export default function List_DailyGames(props) {
  const onPress = (item) => props.onPress(item);

  const [games, setGames] = useState([]);

  const ref_dailyGames = collection(db, dailyGames);



  useEffect(() => {
    return onSnapshot(ref_dailyGames, (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => isToday(doc.commence_time));
      setGames(data);
    });
  }, []);



  

  const isToday = (time) => {
    const time_now = new Date();
    const time_commence = new Date(time);
    return (
      time_now.getFullYear()  == time_commence.getFullYear() &&
      time_now.getMonth()     == time_commence.getMonth() &&
      time_now.getDate()      == time_commence.getDate()
    );
  }



  return (
    <View>
      
      <View style={styles.container_title}>
        <Text style={styles_text.bold_white_20}>   Jogos do Dia   </Text>
      </View>
  
      <FlatList 
        data={games} 
        renderItem={({item}) => 
          <ListItem_Game 
            item={item}
            onPress={() => onPress(item)}
          /> 
        }
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container_title: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 10,
    borderBottomColor: color_shadow_elevation,
    backgroundColor: color_header_grey35,
  }
});