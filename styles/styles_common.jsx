import { StyleSheet } from 'react-native';
import { 
  color_background,
  color_button_lightgreen,
  color_button_yellow,
  color_header_grey35,
  color_header_grey45,
  color_header_lightgreen,
  color_item_input,
  color_item_input_shadow,
} from './colors';



export const android_ripple_style = { borderless: true, };



export const styles_common = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_background,
  },

  container_elevated: {
    elevation:10,
    marginBottom: 5,
    backgroundColor: color_background,
  }
});

export const styles_item = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 4,
    marginVertical: 4,
    marginHorizontal: 8,
  },

  util: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: color_header_grey45,
  },

  body: {
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: color_header_grey35,
  },

  pressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable_center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressable_paddingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
  }
});

export const styles_input = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 4,
  },

  input_container: {
    height: 56,
    paddingVertical: 12,
    paddingHorizontal: 18,

    backgroundColor: color_item_input,
    borderRadius: 10,
    borderTopWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: color_item_input_shadow,
  },

  input: {
    flex: 1,
    color: 'white',
  }
});

export const styles_itemOdds = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', 
    height: 52,
    marginHorizontal: 4,
    marginBottom: 8,
    elevation: 2,
    borderRadius: 4,
    backgroundColor: color_header_grey35,
  },
      
  header: {
    justifyContent: 'center',
    height: 22,
    elevation: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: color_header_lightgreen,
  },
  
  body: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
});


export const styles_pressable = StyleSheet.create({
  container_button: {
    alignItems: 'center',
    margin: 30,
  },
  
  container: {
    elevation: 4,
    borderRadius: 4,
    width: 200,
  }, 
  container_common: {
    height: 40,
  },
  container_important: {
    height: 60,
  },

  pressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable_regist: {
    backgroundColor: color_button_lightgreen,
  },
  pressable_login: {
    backgroundColor: color_button_yellow,
  },
});

export const styles_text = StyleSheet.create({
  white: {
    color: 'white',
    textShadowRadius: 20,
    textShadowColor: 'black'
  },
  red: {
    color: 'red',
    textShadowRadius: 20,
    textShadowColor: 'black'
  },

  bold_white: {
    fontWeight: 'bold',
    color: 'white',
    textShadowRadius: 20,
    textShadowColor: 'black'
  },

  bold_white_20: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textShadowRadius: 20,
    textShadowColor: 'black'
  },
  bold_red_20: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
    textShadowRadius: 20,
    textShadowColor: 'red'
  },

  bold_white_42: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 42,
    textShadowRadius: 20,
    textShadowColor: 'black'
  },
});

export const styles_image = StyleSheet.create({
  image_20: {
    width: 20,
    height: 20,
  },

  image_40: {
    width: 40,
    height: 40,
  },

  image_circle_200: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
});
