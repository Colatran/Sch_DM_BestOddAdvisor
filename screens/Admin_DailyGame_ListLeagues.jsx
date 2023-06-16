import { View } from 'react-native';
import React from 'react';

import List_Leagues_Available from '../components/List_Leagues_Available';

import { styles_common } from '../styles/styles_common';



export default function Admin_DailyGame_ListLeagues({ navigation }) {
  const onPress = (item) => {
    navigation.navigate('Daily Game', { sport: item.key });
  }


  
  return (
    <View style={styles_common.container}>

      <List_Leagues_Available onPress={onPress}/>
      
    </View>
  );
}

