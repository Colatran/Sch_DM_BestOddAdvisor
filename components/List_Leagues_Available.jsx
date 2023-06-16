import { FlatList, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, onSnapshot } from 'firebase/firestore';
import { available_leagues, db } from '../firebase.config';

import ListItem from './ListItem';

import { linkLeagues } from '../utils/Links';
import { android_ripple_style, styles_item, styles_text } from '../styles/styles_common';



export default function List_Leagues_Available(props) {
  const onPress = (item) => props.onPress(item);

  const [leagues, setLeagues] = useState([]);

  const ref_leagues = collection(db, available_leagues);



  useEffect(() => {
    return onSnapshot(ref_leagues, (snapshot) => {
      const keys = snapshot.docs
      .map((doc) => ({ key: doc.data().key}))
      
      fetch(linkLeagues)
      .then(res => res.json())
      .then(json => json.filter(item => findLeague(keys, item.key)))
      .then(data => setLeagues(data));
    });
  }, []);



  const findLeague = (array, key) => {
    return array.find((obj) => obj.key === key);
  }



  return (
    <FlatList 
      data={leagues}
      renderItem={({item}) => 
        <ListItem 
          util={
            <View style={styles_item.pressable_center}>
              <MaterialIcons name="sports-soccer" size={40} color='white' />
            </View>
          } 
          body={
            <Pressable 
              style={styles_item.pressable_paddingLeft}
              android_ripple={android_ripple_style}
              onPress={() => onPress(item)}
            >
              <Text style={styles_text.bold_white}>  {item.title}  </Text>
            </Pressable>
          }
        /> 
      }
    />
  );
}

