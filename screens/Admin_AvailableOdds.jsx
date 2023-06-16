import { FlatList, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { available_oddTypes, db } from '../firebase.config';

import Input_Boolean from '../components/Input_Boolean';
import ListItem from '../components/ListItem';

import { android_ripple_style, styles_common, styles_item, styles_text } from '../styles/styles_common';



const typeList = ['h2h', 'spreads', 'totals'];

export default function Admin_AvailableOdds({ navigation }) {
  const [docs, setDocs] = useState([]);

  const ref_odds = collection(db, available_oddTypes);



  useEffect(() => {
    return onSnapshot(ref_odds, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
    });
  }, []);

  

  const findType = (type) => {
    return docs.find((obj) => obj.type === type);
  }

  const isTypeAvailable = (type) => {
    const foundObj = findType(type);
    if(foundObj) return foundObj.available;
    else return false;
  }

  const addType = async (type) => {
    await addDoc(ref_odds, {
      type: type,
      available: true
    });
  }

  const updateType = async (type, available) => {
    const foundObj = findType(type);
    if (foundObj) {
      await updateDoc(doc(ref_odds, foundObj.id), {
        available: available
      });
    }
    else {
      addType(type);
    }
  }

  const switchType = async (type) => {
    const foundObj = findType(type);
    if (foundObj) {
      await updateDoc(doc(ref_odds, foundObj.id), {
        available: !foundObj.available
      });
    }
    else {
      addType(type);
    }
  }


  
  const onPressOn = (item) => {
    updateType(item, true);
  }
  const onPressOff = (item) => { 
    updateType(item, false);
  }
  const onPress = (item) => {
    switchType(item);
  }

  
  
  return (
    <View style={styles_common.container}>
      <FlatList 
        data={typeList} 
        renderItem={({item}) => 
          <ListItem 
            util={
              <View style={styles_item.pressable_center}>
                <Input_Boolean 
                  onPressOn={() => onPressOn(item)} 
                  onPressOff={() => onPressOff(item)}
                  on={isTypeAvailable(item)}
                />
              </View>
            }
            body={
              <Pressable 
                style={styles_item.pressable_center}
                android_ripple={android_ripple_style}
                onPress={() => onPress(item)}
              >
                <Text style={styles_text.bold_white}>   {item}   </Text>
              </Pressable>
            }
          />
        }
      />
    </View>
  );
}