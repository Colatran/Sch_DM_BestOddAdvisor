import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';

import List_DailyGames from '../components/List_DailyGames';

import { UserContext } from '../utils/UserContext';
import { styles_common, styles_image, styles_text } from '../styles/styles_common';


export default function Regist_Home({ navigation }) {
  const { _image, _userName } = useContext(UserContext);



  const onPressGame = (item) => {
    navigation.navigate('Odds', { sport: item.sport, gameId: item.key });
  }



  return (
    <View style={styles_common.container}>

      <View style={styles.container_user}>
        <View style={styles.container_foto}>
          <Image
            style={styles_image.image_circle_200}
            source={
              (_image) ?
              { uri: _image }
              :
              require('../assets/placeholder_avatar.png')
            }
          />
        </View>
        
        <View style={styles.container_username}>
          <Text style={styles_text.bold_white_20}>  {_userName}  </Text>
        </View>

      </View>

      <View>
        <List_DailyGames onPress={onPressGame}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container_user: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container_foto: {
    margin: 10,
  },

  container_username: {
    margin: 10,
    marginTop: 0,
  }
});