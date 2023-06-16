import { StyleSheet, Text, View, Pressable } from 'react-native';
import { android_ripple_style, styles_text, styles_itemOdds } from '../styles/styles_common';
import { color_header_grey45 } from '../styles/colors';



export default function ListItem_Odds_spreads(props) {
  const item = props.item;

  const i_markets = item.markets.findIndex(item => item.key === 'spreads');
  if(i_markets === -1) return (<></>);
  const markets = item.markets[i_markets];

  const home_point = markets.outcomes[1].point;
  const home_price = markets.outcomes[1].price;
  const away_point = markets.outcomes[0].point;
  const away_price = markets.outcomes[0].price;

  

  return (
    <View style={styles_itemOdds.container}>

      <Pressable 
        style={{flex: 1}}
        android_ripple={android_ripple_style}
      >

        <View style={styles_itemOdds.header}>
          <Text style={styles_text.bold_white}>   {item.title}   </Text>
        </View>
              
        <View style={styles_itemOdds.body}>

          <View style={[styles.body_item, styles.body_item_right]}>
            <Text style={styles_text.white}>   {home_point}  : </Text>
          </View>

          <View style={[styles.body_item, styles.body_item_boder_right]}>
            <Text style={styles_text.white}> {home_price}  </Text>
          </View>

          <View style={[styles.body_item, styles.body_item_right]}>
            <Text style={styles_text.white}>   {away_point}  : </Text>
          </View>

          <View style={styles.body_item}>
            <Text style={styles_text.white}> {away_price}  </Text>
          </View>

        </View>

      </Pressable>

    </View>
  );  
}

const styles = StyleSheet.create({
  body_item: {
    flex: 1,
    justifyContent: 'center',
  },
  body_item_right: {
    alignItems: 'flex-end'
  },

  body_item_boder_right: {
    borderRightWidth: 4,
    borderColor: color_header_grey45,
  }
});