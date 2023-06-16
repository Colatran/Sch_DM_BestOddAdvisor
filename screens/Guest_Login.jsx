import { StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword }from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { app, db, users } from '../firebase.config';

import Input_Text from '../components/Input_Text';
import Input_Password from '../components/Input_Password';

import { UserContext } from '../utils/UserContext';
import { android_ripple_style, styles_common, styles_pressable, styles_text } from '../styles/styles_common';



export default function Guest_Login({ navigation }) {
  const { 
    setRegisted,    setIsAdmin, 
    _setDocId,      _setUid, 
    _setUserName,   _setEmail,
    _setBirthDate,  _setImage
  } = useContext(UserContext);

  //const [email, setEmail] = useState('admin@admin.com');
  //const [pass, setPass]   = useState('123456789');
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');

  const [hide, setHide] = useState(true);
  const [valid, setValid] = useState(true);

  

  const onPressLogin = async () => {
    try {
      const auth = getAuth(app);
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      
      const usersRef = collection(db, users);
      
      const q = query(usersRef, where("uid", "==", userCred.user.uid));
      const querySnapshot = await getDocs(q);
      const userDocument = querySnapshot.docs[0].data();

      setRegisted(true);
      setIsAdmin(userDocument.isAdmin);
      _setDocId(querySnapshot.docs[0].id);
      _setUid(userDocument.uid);
      _setEmail(userDocument.email);
      _setUserName(userDocument.name);
      _setImage(userDocument.image);

      const birthDate = userDocument.birthDate;
      const mill = birthDate.seconds * 1000 + birthDate.nanoseconds / 1000000;
      _setBirthDate(new Date(mill));
      
    } catch (error) {
    switch (error.code) {
      case 'auth/operation-not-allowed':
        console.log(error);
        setValid(false);
      break;
      default:
        console.log(error);
        setValid(false);
    }
    }
  }



  return (
    <View style={styles_common.container}>

      <View style={{flex: 1}}>
        
        <View style={styles.container_items}>
          <Input_Text 
            label = 'Email'
            placeholder = 'exemplo@mail.com'
            value = {email}
            setValue = {setEmail}
            valid = {valid}
            errorMsg = ' '
          />
          <Input_Password 
            label = 'Password'
            placeholder = ''
            value = {pass}
            setValue = {setPass}
            valid = {valid}
            errorMsg = 'Combinação de email e password inválida!'
            hide = {hide}
            setHide = {setHide}
            hideButton = {true}
          />
        </View>
        
        <View style={styles_pressable.container_button}>
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

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container_items: {
    flex: 1,
    justifyContent: 'center',
  },
});