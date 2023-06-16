import { StyleSheet, View, Pressable } from 'react-native';

import ListItem_Game_Teams from './ListItem_Game_Teams';
import ListItem_Game_Time from './ListItem_Game_Time';

import { styles_item, android_ripple_style } from '../styles/styles_common';



export default function ListItem_Game(props) {
  const item = props.item;
  const onPress = props.onPress;

  
  
  return (
    <View style={styles_item.container}>

      <View style={[styles_item.util, styles.util]}>
        <View style={styles_item.pressable_center}>
          <ListItem_Game_Time commence_time={item.commence_time}/>
        </View>
      </View>

      <View style={styles_item.body}>
        <Pressable 
          style={styles_item.pressable}
          android_ripple={android_ripple_style}
          onPress={onPress}
        >
          <ListItem_Game_Teams home_team={item.home_team} away_team={item.away_team}/>
        </Pressable>
      </View>

    </View>
  );  
}



const styles = StyleSheet.create({
  util: {
    width: 90,
  },
});