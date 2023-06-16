import { Pressable } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { color_header_grey35 } from '../styles/colors';



const color_yellow = '#faf57f';

export default function Input_Boolean_Favourite(props) {
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
      android_ripple={{borderless: true, color: color_yellow, radius: 25}}
      onPress={OnPress}
    >
      <MaterialIcons name="star" size={40} color={ on ? color_yellow : color_header_grey35}/>
    </Pressable>
  );
}