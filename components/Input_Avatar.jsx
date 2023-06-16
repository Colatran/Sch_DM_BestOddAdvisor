import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { android_ripple_style, styles_image, styles_pressable, styles_text } from '../styles/styles_common';
import { color_button_blue } from '../styles/colors';




export default function Input_Avatar(props) {
  const image = props.image;
  const setImage = props.setImage;



  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };



  return (
    <View style={styles.container}>

      <View style={styles.container_foto}>
        <Image 
          style={styles_image.image_circle_200}
          source={
            (image) ?
            { uri: image }
            :
            require('../assets/placeholder_avatar.png')
          }
        />
      </View>

      <View style={styles.container_edit}>
        <View style={[styles_pressable.container, styles_pressable.container_common]}> 
          <Pressable
            style={[styles_pressable.pressable, styles.pressable]}
            android_ripple={android_ripple_style}
            onPress={onPress}
          >
            <View style={styles.pressable_side}>
            </View>
            <View>
              <Text style={styles_text.bold_white_20}> Inserir Foto </Text>
            </View>
            <View style={styles.pressable_side}>
              <MaterialIcons name="edit" size={30} color='white' />
            </View>
          </Pressable>
        </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 15,
  },

  container_foto: {
    alignItems: 'center'
  },
  container_edit: {
    margin: 5,
  },

  pressable: {
    backgroundColor: color_button_blue,
  },
  pressable_side: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});