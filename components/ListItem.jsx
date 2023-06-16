import { StyleSheet, View } from 'react-native';
import { styles_item } from '../styles/styles_common';

export default function ListItem(props) {
  const util = props.util;
  const body = props.body;

  return (
    <View style={styles_item.container}>

      <View style={[styles_item.util, styles.util]}>
        {util}
      </View>

      <View style={styles_item.body}>
        {body}
      </View>

    </View>
  );  
}

const styles = StyleSheet.create({
  util: {
    width: 50,
  },
});