import { FlatList, View, Text, Pressable} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, favourite_teams } from '../firebase.config';

import ListItem from '../components/ListItem';
import Input_Boolean_Favourite from '../components/Input_Boolean_Favourite';

import { UserContext } from '../utils/UserContext';
import { android_ripple_style, styles_common, styles_item, styles_text } from '../styles/styles_common';



export default function Regist_Favourites({ navigation }) {
  const { _uid } = useContext(UserContext);

  const [teamDocs, setTeamDocs] = useState([]);
  
  const ref_favTeams = collection(db, favourite_teams);



  useEffect(() => {
    return onSnapshot(ref_favTeams, (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.uid === _uid);
      setTeamDocs(data);
    });
  }, []);

  

  const deleteFavTeam = async (team) => {
    const docRef = doc(ref_favTeams, team.id);
    await deleteDoc(docRef);
  }



  const onPressOn = (team) => { }
  const onPressOff = (team) => {
    deleteFavTeam(team);
  }
  const onPress = (team) => { }


  
  return (
    <View style={styles_common.container}>

      <FlatList 
        data={teamDocs}
        renderItem={({item}) => 
          <ListItem 
            util={
              <View style={styles_item.pressable_center}>
                <Input_Boolean_Favourite 
                  onPressOn={() => onPressOn(item)}
                  onPressOff={() => onPressOff(item)}
                  on={true}
                />
              </View>
            } 
            body={
              <Pressable 
                style={styles_item.pressable_paddingLeft}
                android_ripple={android_ripple_style}
                onPress={() => onPress(item)}
              >
                <Text style={styles_text.bold_white}>  {item.team}  </Text>
              </Pressable>
            }
          /> 
        }
      />
      
    </View>
  );
}

