import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style, styles_input, styles_text } from '../styles/styles_common';



export default function Input_Password(props) {
  const label       = props.label;
  const placeholder = props.placeholder;

  const value       = props.value;
  const setValue    = props.setValue;

  const valid       = props.valid;
  const errorMsg    = props.errorMsg;

  const hide        = props.hide;
  const setHide     = props.setHide;
  const hideButton  = props.hideButton;
  


  const onPressVisibility = () => {
    setHide(!hide);
  }



  return (
    <View style={styles_input.container}>
      <Text style={styles_text.bold_white}>  {label}</Text>

      <View style={[styles_input.input_container, {flexDirection: 'row'}]}>
        <TextInput style={styles_input.input}
          placeholder={placeholder}
          value={value}
          onChangeText={text => setValue(text)}
          secureTextEntry={hide}
        />
        {
          (hideButton) ?
            <Pressable
              onPress={() => onPressVisibility()}
              android_ripple={android_ripple_style}
            >
              <MaterialIcons name={hide ? "visibility" : "visibility-off"} size={30} color='white' />
            </Pressable>
          :
            <></>
        }
      </View>

      <Text style={styles_text.red}>  {valid ? " " : errorMsg}   </Text>
    </View>
  );
}