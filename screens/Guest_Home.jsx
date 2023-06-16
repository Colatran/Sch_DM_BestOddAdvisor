import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';

import List_DailyGames from '../components/List_DailyGames';

import { android_ripple_style, styles_common, styles_pressable, styles_text } from '../styles/styles_common';



export default function Guest_Home({ navigation }) {
  const onPressLogin = () => {
    navigation.navigate('Login');
  }
  const onPressRegister = () => {
    navigation.navigate('Register');
  }
  const onPressGame = (item) => {
    navigation.navigate('Odds', { sport: item.sport, gameId: item.key });
  }



  return (
    <View style={styles_common.container}>

      <View style={[styles.container_buttons, styles_common.container_elevated]}>

        <View style={[styles_pressable.container, styles_pressable.container_important]}> 
          <Pressable
            style={[styles_pressable.pressable, styles_pressable.pressable_regist]}
            android_ripple={android_ripple_style}
            onPress={onPressRegister}
          >
            <Text style={styles_text.bold_white_20}>   REGISTAR   </Text>
          </Pressable>
        </View>

        <Text style={styles_text.bold_white}>   Ou   </Text>

        <View style={[styles_pressable.container, styles_pressable.container_important]}> 
          <Pressable
            style={[styles_pressable.pressable, styles_pressable.pressable_login]}
            android_ripple={android_ripple_style}
            onPress={onPressLogin}
          >
            <Text style={styles_text.bold_white_20}>   LOGIN   </Text>
          </Pressable>
        </View>

      </View>

      <View style={styles.container_daily}>
        <List_DailyGames onPress={onPressGame}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container_buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly', 
  },

  container_daily: {
    flex:2,
  },
});