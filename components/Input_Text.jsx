import { View, Text, TextInput } from 'react-native';

import { styles_input, styles_text } from '../styles/styles_common';



export default function Input_Text(props) {
  const label =       props.label;
  const placeholder = props.placeholder;

  const value =     props.value;
  const setValue =  props.setValue;

  const valid =     props.valid;
  const errorMsg =  props.errorMsg;

  return (
    <View style={styles_input.container}>
      <Text style={styles_text.bold_white}>  {label}</Text>

      <View style={styles_input.input_container}>
        <TextInput style={styles_input.input}
          placeholder={placeholder}
          value={value}
          onChangeText={text => setValue(text)}
        />
      </View>

      <Text style={styles_text.red}>  {valid ? " " : errorMsg}   </Text>
    </View>
  );
}