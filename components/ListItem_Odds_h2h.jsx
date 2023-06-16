import { StyleSheet, Text, View, Pressable } from 'react-native';
import { android_ripple_style, styles_text, styles_itemOdds } from '../styles/styles_common';
import { color_header_grey45 } from '../styles/colors';



export default function ListItem_Odds_h2h(props) {
  const item = props.item;

  const i_markets = item.markets.findIndex(item => item.key === 'h2h');
  if(i_markets === -1) return (<></>);
  const markets = item.markets[i_markets];


  
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

          <View style={styles.body_item}>
            <Text style={styles_text.white}>   {markets.outcomes[1].price}   </Text>
          </View>

          <View style={[styles.body_item, styles.body_item_center]}>
            <Text style={styles_text.white}>   {markets.outcomes[2].price}   </Text>
          </View>

          <View style={styles.body_item}>
            <Text style={styles_text.white}>   {markets.outcomes[0].price}   </Text>
          </View>
          
        </View>

      </Pressable>

    </View>
  );  
}

const styles = StyleSheet.create({
  body_item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body_item_center: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: color_header_grey45,
  },
});