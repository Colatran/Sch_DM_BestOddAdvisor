import { StyleSheet, FlatList, View, Text, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { available_oddTypes, db, favourite_teams } from '../firebase.config';

import Input_Boolean_Favourite from '../components/Input_Boolean_Favourite';
import ListItem_Game_Time from '../components/ListItem_Game_Time';
import ListItem_Odds_h2h from '../components/ListItem_Odds_h2h';
import ListItem_Odds_totals from '../components/ListItem_Odds_totals';
import ListItem_Odds_spreads from '../components/ListItem_Odds_spreads';

import { UserContext } from '../utils/UserContext';
import { android_ripple_style, styles_common, styles_text } from '../styles/styles_common';
import { color_button_blue, color_header_grey45, color_shadow_elevation } from '../styles/colors';



export default function List_Odds(props) {
  const navigation = props.navigation;
  const game = props.game;
  
  const { _uid } = useContext(UserContext);

  const [favDocs, setFavDocs] = useState([]);
  const [oddTypes, setOddTypes] = useState({});
  const [currOddType, setCurrOddType] = useState();

  const ref_odds = collection(db, available_oddTypes);
  const ref_favTeams = collection(db, favourite_teams);


 
  //Get Favourite Teams
  useEffect(() => {
    return onSnapshot(ref_favTeams, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavDocs(data);
    });
  }, []);
  
  //Get Odds
  useEffect(() => {
    getDocs(ref_odds)
    .then((query) => {
      // Get oddTypes
      const _oddTypes = [];
      query.docs.forEach((doc) => {
        const data = doc.data();
        if(data.available) _oddTypes.push(data.type);
      });

      setOddTypes(_oddTypes);

      if (_oddTypes.find((item) => item === 'h2h')) setCurrOddType('h2h');
      else if(_oddTypes.find((item) => item === 'totals')) setCurrOddType('totals');
      else setCurrOddType('spreads');
    });
  }, []);



  const findFavTeam = (team) => {
    return favDocs.find((obj) => obj.team === team);
  }

  const isFavTeam = (team) => {
    if(findFavTeam(team)) return true;
    else return false;
  }

  const addFavTeam = async (team) => {
    await addDoc(ref_favTeams, {
      uid: _uid,
      team: team
    });
  }

  const deleteFavTeam = async (team) => {
    const foundObj = findFavTeam(team);
    const docRef = doc(ref_favTeams, foundObj.id);
    await deleteDoc(docRef);
  }



  const onPressFavOn = (team) => {
    if(_uid === "") {
      navigation.navigate('Login');
    }
    else {
      addFavTeam(team);
    }
  }
  const onPressFavOff = (team) => {
    deleteFavTeam(team);
  }
  const onPressOddType = (type) => {
    setCurrOddType(type);
  }
  


  return (
    <View style={styles_common.container}>

      <View style={styles.container_header}>

        <View style={styles.game_data}>
          <View style={styles.game_data_side}>
            <Text style={styles_text.bold_red_20}>   VS   </Text>
            <ListItem_Game_Time commence_time={game.commence_time}/>
          </View>

          <View style={styles.game_data_teams}>
            <View style={styles.game_data_team}>
              <Input_Boolean_Favourite 
                onPressOn={() => onPressFavOn(game.home_team)}
                onPressOff={() => onPressFavOff(game.home_team)}
                on={isFavTeam(game.home_team)}
              />
              <Text style={styles_text.bold_white_20}>   {game.home_team}   </Text>
            </View>
            <View style={styles.game_data_team}>
              <Input_Boolean_Favourite
                onPressOn={() => onPressFavOn(game.away_team)}
                onPressOff={() => onPressFavOff(game.away_team)}
                on={isFavTeam(game.away_team)}
              />
              <Text style={styles_text.bold_white_20}>   {game.away_team}   </Text>
            </View>  
          </View>
        </View>

      </View>

      <View style={styles.oddTypes_container}>
        <FlatList
          data={oddTypes}
          horizontal={true}
          renderItem={({item}) =>
            <View style={styles.oddTypes_pressable_container}>
              <Pressable 
                style={currOddType === item ? styles.oddTypes_pressable_pressed : styles.oddTypes_pressable}
                android_ripple={android_ripple_style}
                onPress={() => onPressOddType(item)}
              >
                <Text style={styles_text.bold_white}>  {item}  </Text>
              </Pressable>
            </View>
          }
        />
      </View>

      {
        currOddType === 'h2h' ?
        <>
          <View style={styles_odds.list_header}>
            <View style={styles_odds.list_header_item}>
              <Text style={styles_text.bold_white}>   {game.home_team}   </Text>
            </View>
            <View style={styles_odds.list_header_item}>
              <Text style={styles_text.bold_white}>   Empate   </Text>
            </View>
            <View style={styles_odds.list_header_item}>
              <Text style={styles_text.bold_white}>   {game.away_team}   </Text>
            </View>
          </View>

          <FlatList 
            data={game.bookmakers}
            renderItem={({item}) => <ListItem_Odds_h2h item={item}/>}
          />
        </>
        :
        currOddType === 'totals' ?
        <>
          <View style={styles_odds.list_header_totals}/>

          <FlatList 
            data={game.bookmakers}
            renderItem={({item}) => <ListItem_Odds_totals item={item}/>}
          />
        </>
        :
        <>
          <View style={styles_odds.list_header}>
            <View style={styles_odds.list_header_item}>
              <Text style={styles_text.bold_white}>   {game.home_team}   </Text>
            </View>
            <View style={styles_odds.list_header_item}>
              <Text style={styles_text.bold_white}>   {game.away_team}   </Text>
            </View>
          </View>

          <FlatList 
            data={game.bookmakers}
            renderItem={({item}) => <ListItem_Odds_spreads item={item}/>}
          />
        </>
        }
    </View>
  );
}



const styles = StyleSheet.create({
  container_header: {
    paddingBottom: 5,
  },

  game_data: {
    flexDirection: 'row',
    marginTop: 10,
  },
  game_data_side:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    marginHorizontal: 10,
  },
  game_data_teams: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  game_data_team: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color_header_grey45,
    borderRadius: 100,
    padding: 5,
    margin: 5,
    elevation: 3,
  },

  oddTypes_container: {
    alignItems: 'center',
    borderTopColor: color_shadow_elevation,
    borderBottomColor: color_shadow_elevation,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  oddTypes_pressable_container: {
    borderRadius: 4,
    elevation: 4,
    margin: 10,
  },
  oddTypes_pressable: {
    padding: 10,
    backgroundColor: color_button_blue
  },
  oddTypes_pressable_pressed: {
    padding: 10,
    backgroundColor: '#90a0ff',
  }
});

const styles_odds = StyleSheet.create({
  list_header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: color_shadow_elevation
  },

  list_header_item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color_header_grey45,
    borderRadius: 100,
    padding: 5,
    margin: 5,
    marginBottom: 10,
    elevation: 3,
  },

  list_header_totals: {
    borderBottomWidth: 5,
    borderBottomColor: color_shadow_elevation
  },
});