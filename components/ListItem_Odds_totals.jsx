import { StyleSheet, Text, View, Pressable } from 'react-native';
import { android_ripple_style, styles_text, styles_itemOdds } from '../styles/styles_common';
import { color_header_grey45 } from '../styles/colors';



export default function ListItem_Odds_totals(props) {
  const item = props.item;

  const i_markets = item.markets.findIndex(item => item.key === 'totals');
  if(i_markets === -1) return (<></>);
  const markets = item.markets[i_markets];

  const i_over = markets.outcomes.findIndex(item => item.name === 'Over');
  const i_under = 1 - i_over;

  const over_point = markets.outcomes[i_over].point;
  const over_price = markets.outcomes[i_over].price;
  const under_point = markets.outcomes[i_under].point;
  const under_price = markets.outcomes[i_under].price;



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

          <View style={[styles.body_item_point, styles.body_item_point_left]}>
            <Text style={styles_text.white}>   Over:   {over_point}   </Text>
          </View>

          <View style={styles.body_item_price}>
            <Text style={styles_text.white}>   {over_price}   </Text>
          </View>

          <View style={styles.body_item_point}>
            <Text style={styles_text.white}>   Under:   {under_point}   </Text>
          </View>
          
          <View style={styles.body_item_price}>
            <Text style={styles_text.white}>   {under_price}   </Text>
          </View>

        </View>

      </Pressable>

    </View>
  );  
}

const styles = StyleSheet.create({
  body_item_point: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color_header_grey45,
  },
  
  body_item_point_left: {
    borderBottomLeftRadius: 4,
  },

  body_item_price: {
    flex: 1,
    justifyContent: 'center',
  },
});