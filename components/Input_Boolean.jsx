import { Pressable } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { color_header_grey35 } from '../styles/colors';



export default function Input_Boolean(props) {
  const on = props.on;

  const OnPress = () => {
    if (on) {
      props.onPressOff();
    }
    else {
      props.onPressOn();
    };
  }

  return (
    <Pressable 
      android_ripple={{borderless: true, color: 'white', radius: 25}}
      onPress={OnPress}
    >
      <MaterialIcons name="done" size={40} color={ on ? 'white' : color_header_grey35}/>
    </Pressable>
  );
}