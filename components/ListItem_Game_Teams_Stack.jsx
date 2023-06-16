import { StyleSheet, View, Text } from 'react-native';
import { styles_text } from '../styles/styles_common';


export default function ListItem_Game_Teams_Stack(props) {
  const style = props.style;
  const home_team = props.home_team;
  const away_team = props.away_team;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.container_vs}>
        <Text style={styles_text.white}>  VS  </Text>
      </View>
      <View style={styles.constainer_teams}>
        <Text style={styles_text.bold_white}>  {home_team}  </Text>
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

  container_vs: {
    justifyContent: 'center',
  },

  constainer_teams: {
    flex: 1,
  },  
});