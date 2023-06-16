import { FlatList, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { available_leagues, db } from '../firebase.config';

import ListItem from '../components/ListItem';
import Input_Boolean from '../components/Input_Boolean';

import { linkLeagues } from '../utils/Links';
import { android_ripple_style, styles_common, styles_item, styles_text } from '../styles/styles_common';



export default function Admin_AvailableLeagues({ navigation }) {
  const [leagues, setLeagues] = useState([]);
  const [docs, setDocs] = useState([]);

  const ref_leagues = collection(db, available_leagues);


  
  useEffect(() => {
    return onSnapshot(ref_leagues, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);

  useEffect(() => {
    fetch(linkLeagues)
      .then(res => res.json())
      .then(json => json.filter(item => item.group === "Soccer"))
      .then(data => {setLeagues(data);})
  }, []);



  const findLeague = (key) => {
    return docs.find((obj) => obj.key === key);
  }

  const isLeagueAvailable = (key) => {
    if(findLeague(key)) return true;
    else return false;
  }

  const addLeague = async (key) => {
    await addDoc(ref_leagues, {
      key: key
    });
  }

  const deleteLeague = async (key) => {
    const foundObj = findLeague(key);
    const docRef = doc(ref_leagues, foundObj.id);
    deleteDoc(docRef);
  }

  const switchLeague = async (key) => {
    const foundObj = findLeague(key);

    if(foundObj) {
      const docRef = doc(ref_leagues, foundObj.id);
      deleteDoc(docRef);
    }
    else {
      await addDoc(ref_leagues, { 
        key: key
      });
    }
  }



  const onPress = (item) => {
    switchLeague(item.key);
  }
  const onPressOn = (item) => {
    addLeague(item.key);
  }
  const onPressOff = (item) => {
    deleteLeague(item.key);
  }



  return (
    <View style={styles_common.container}>

      <FlatList 
        data={leagues}
        renderItem={({item}) => 
          <ListItem 
            util={
              <View style={styles_item.pressable_center}>
                <Input_Boolean 
                  onPressOn={() => onPressOn(item)} 
                  onPressOff={() => onPressOff(item)}
                  on={isLeagueAvailable(item.key)}
                />
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
      
    </View>
  );
}

