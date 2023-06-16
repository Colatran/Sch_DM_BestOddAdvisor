import { StyleSheet, View, Text } from 'react-native';
import { styles_text } from '../styles/styles_common';



export default function ListItem_Game_Time(props) {
  const style = props.style;
  const time_commence = new Date(props.commence_time);

  const hours =   time_commence.getHours()   .toString().padStart(2, '0');
  const minuts =  time_commence.getMinutes() .toString().padStart(2, '0');
  const day =     time_commence.getDate()    .toString().padStart(2, '0');
  const month =   (time_commence.getMonth() + 1).toString().padStart(2, '0');
  const year =    time_commence.getFullYear();

  const time_now = new Date();
  const isToday = (
    time_now.getFullYear()  == time_commence.getFullYear() &&
    time_now.getMonth()     == time_commence.getMonth() &&
    time_now.getDate()      == time_commence.getDate()
  );

  const diffMill = time_now.getTime() - time_commence.getTime();
  const hasStarted = diffMill > 0;

  const diffMin = Math.floor(diffMill / (1000 * 60));
  const secondHalf = diffMin > 45;



  return (
    <View style={[styles.container, style]}>
      {
        isToday ?
        <>
          {
            hasStarted ?
            <Text style={styles_text.white}>  {secondHalf ? diffMin - 15 : diffMin}'  </Text>
            :
            <Text style={styles_text.white}>  {hours}:{minuts}  </Text>
          }
        </>
        :
        <>
          <Text style={styles_text.white}>  {day}-{month}-{year}  </Text>
          <Text style={styles_text.white}>  {hours}:{minuts}  </Text>
        </>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  body_item: {
    flex: 1,
    alignItems: 'center',
  },  
});