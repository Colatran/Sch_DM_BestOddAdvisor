import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styles_input, styles_text } from '../styles/styles_common';



export default function Input_Date(props) {
  const [show, setShow] = useState(false);

  const label =     props.label;
  const date =      props.date;
  const setDate =   props.setDate;
  const valid =     props.valid;
  const errorMsg =  props.errorMsg;

  const day =     date.getDate()    .toString().padStart(2, '0');
  const month =   (date.getMonth() + 1).toString().padStart(2, '0');
  const year =    date.getFullYear();



  const onPressDatePicker = () => {
    setShow(true);
  }

  const onChange = ({type}, date) => {
    if (type == "set") { setDate(date); }
    setShow(false);
  }

  

  return (
    <View style={styles_input.container}>
      <Text style={styles_text.bold_white}>  {label}</Text>

      <View style={[styles_input.input_container, styles.input_container]}>

        <Pressable style={styles.pressable}
          onPress={onPressDatePicker}
        >
          <View style={styles.pressable_container}>
            <Text style={styles_text.white}>  {day} / {month} / {year}  </Text>
          </View>
        </Pressable>

        {show ?
          <DateTimePicker
            mode='date'
            display='spinner'
            value={date}
            onChange={onChange}
            maximumDate={new Date()}
          />
          :
          <></>
        }

      </View>

      <Text style={styles_text.red}>  {valid ? " " : errorMsg}   </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input_container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  pressable: {
    flex: 1,
    justifyContent: 'center',
  },
  
  pressable_container: {
    paddingHorizontal: 18,
  },
});
