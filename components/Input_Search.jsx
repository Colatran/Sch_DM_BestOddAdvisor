import { View, TextInput, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styles_common, styles_input } from "../styles/styles_common";



export default function Input_Search(props) {
  const value =     props.value;
  const onChange =  props.onChange;


  
  return(
    <View style={styles_common.container_elevated}>
      <View style={[styles_input.input_container, styles.search_container]}>
        <TextInput style={styles_input.input}
          value={value}
          onChangeText={text => onChange(text)}
        />
        <MaterialIcons name="search" size={30} color='white' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search_container: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 12,
  }
});