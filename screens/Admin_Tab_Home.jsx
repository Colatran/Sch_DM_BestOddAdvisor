import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';

import { android_ripple_style, styles_common, styles_pressable, styles_text } from '../styles/styles_common';



export default function Admin_Home({ navigation }) {
  const onPressAvailableOdds = () => {
    navigation.navigate('Available Odds');
  }
  const onPressAvailableLeagues = () => {
    navigation.navigate('Available Leagues');
  }
  const onPressDailyGames = () => {
    navigation.navigate('Daily Game Leagues');
  }



  return (
    <View style={styles_common.container}>

      <View style={[styles.container_buttons, styles_common.container_elevated]}>

        <View style={[styles_pressable.container, styles_pressable.container_important]}> 
          <Pressable
            style={[styles_pressable.pressable, styles_pressable.pressable_regist]}
            android_ripple={android_ripple_style}
            onPress={onPressAvailableOdds}
          >
            <Text style={styles_text.bold_white_20}>   Odds Disponíveis   </Text>
          </Pressable>
        </View>

        <View style={[styles_pressable.container, styles_pressable.container_important]}> 
          <Pressable
            style={[styles_pressable.pressable, styles_pressable.pressable_regist]}
            android_ripple={android_ripple_style}
            onPress={onPressAvailableLeagues}
          >
            <Text style={styles_text.bold_white_20}>   Ligas Disponíveis   </Text>
          </Pressable>
        </View>

        <View style={[styles_pressable.container, styles_pressable.container_important]}> 
          <Pressable
            style={[styles_pressable.pressable, styles_pressable.pressable_regist]}
            android_ripple={android_ripple_style}
            onPress={onPressDailyGames}
          >
            <Text style={styles_text.bold_white_20}>   Jogos Diários   </Text>
          </Pressable>
        </View>

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