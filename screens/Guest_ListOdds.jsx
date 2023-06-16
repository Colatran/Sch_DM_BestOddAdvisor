import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { available_oddTypes, db } from '../firebase.config';

import { linkOdds } from '../utils/Links';
import List_Odds from '../components/List_Odds';



export default function Guest_ListOdds({ route, navigation }) {
  const { sport, gameId } = route.params;  
  
  const [game, setGame] = useState({});

  const ref_odds = collection(db, available_oddTypes);



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

      // Get game
      fetch(linkOdds(sport, _oddTypes, gameId))
      .then(response => response.json())
      .then(data => setGame(data[0]));
    });
  }, []);


  return (
    <List_Odds game={game} navigation={navigation}/>
  );
}