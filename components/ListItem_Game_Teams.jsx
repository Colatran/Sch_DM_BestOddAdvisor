import { StyleSheet, View, Text } from 'react-native';
import { styles_text } from '../styles/styles_common';


export default function ListItem_Game_Teams(props) {
  const home_team = props.home_team;
  const away_team = props.away_team;

  return (
    <View style={styles.container}>

      <View style={styles.body_item}>
        <Text style={styles_text.bold_white}>  {home_team}  </Text>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <Text style={styles_text.white}>  VS  </Text>
      </View>

      <View style={styles.body_item}>
        <Text style={styles_text.bold_white}>  {away_team}  </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  body_item: {
    flex: 1,
    alignItems: 'center',
  },  
});