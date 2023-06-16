import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app, users } from '../firebase.config';
import { getAuth, updatePassword, updateEmail, signOut } from 'firebase/auth';

import Input_Text from '../components/Input_Text';
import Input_Avatar from '../components/Input_Avatar';
import Input_Date from '../components/Input_Date';

import { UserContext } from '../utils/UserContext';
import { validateBirthDate, validateEmail, validatePass, validatePassConfirm } from '../utils/Validations';
import { android_ripple_style, styles_common, styles_pressable, styles_text } from '../styles/styles_common';
import { color_button_lightgreen } from '../styles/colors';
import Input_Password from '../components/Input_Password';



export default function Settings({ navigation }) {
  const { _docId, _email, _birthDate, _image, 
          _setEmail, _setBirthDate, _setImage,
          setRegisted
  } = useContext(UserContext);

  const [email, setEmail]         = useState(_email);
  const [pass, setPass]           = useState('');
  const [passConf, setPassConf]   = useState('');
  const [birthDate, setBirthDate] = useState(_birthDate);
  const [image, setImage]         = useState(_image);

  const [hide, setHide] = useState(true);

  const [valid_Email, setValid_Email]         = useState(true);
  const [valid_Pass, setValid_Pass]           = useState(true);
  const [valid_PassConf, setValid_PassConf]   = useState(true);
  const [valid_BirthDate, setValid_BirthDate] = useState(true);

  

  const onPressSave = async () => {
    const changedPass = pass.trim() !== '';
    
    var valid = {
      valid: true
    };

    validatePassConfirm(valid, pass, passConf, setValid_PassConf);
    validateBirthDate(valid, birthDate, setValid_BirthDate);
    validateEmail(valid, email, setValid_Email);
    if(changedPass) validatePass(valid, pass, setValid_Pass);

    if (valid.valid) {
      try {
        const usersRef = collection(getFirestore(), users);
        await updateDoc(doc(usersRef, _docId), {
          email: email,
          birthDate: birthDate,
          image: image
        });
        
        _setEmail(email);
        _setBirthDate(birthDate);
        _setImage(image);

        const auth = getAuth(app);
        const user = auth.currentUser;
        await updateEmail(user, email);
        if (changedPass) await updatePassword(user, pass);
        
        navigation.goBack()
      } 
      catch(error) {
        console.log(error.code);
      }
    }
  }

  const onPressLogout = () => {
    const auth = getAuth(app);
    signOut(auth);

    
    setRegisted(false);
  }


  
  return (
    <View style={styles_common.container}>

      <ScrollView>
        
        <View>
          <Input_Avatar
            image = {image}
            setImage = {setImage}
          />
          <Input_Text 
            label= 'Email'
            placeholder= 'exemplo@mail.com'
            value = {email}
            setValue = {setEmail}
            valid = {valid_Email}
            errorMsg= 'Este Email não é válido!'
          />
          <Input_Password 
            label='Password'
            placeholder= ''
            value = {pass}
            setValue = {setPass}
            valid = {valid_Pass}
            errorMsg= 'Password muito curta!'
            hide = {hide}
            setHide = {setHide}
            hideButton = {true}
          />
          <Input_Password 
            label='Confirme a Password'
            placeholder= ''
            value = {passConf}
            setValue = {setPassConf}
            valid = {valid_PassConf}
            errorMsg= 'A combinação da password não corresponde!'
            hide = {hide}
            setHide = {setHide}
            hideButton = {false}
          />
          <Input_Date
            label='Data de Nascimento'
            date={birthDate}
            setDate={setBirthDate}
            valid={valid_BirthDate}
            errorMsg= 'Tem de ter pelo menos 18 anos de idade!'
          />
        </View>

        <View style={styles_pressable.container_button}>
          <View style={[styles_pressable.container, styles_pressable.container_important]}> 
            <Pressable
              style={[styles_pressable.pressable, styles.pressable]}
              android_ripple={android_ripple_style}
              onPress={onPressSave}
            >
              <Text style={styles_text.bold_white_20}>  Salvar  </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles_pressable.container_button}>
          <View style={[styles_pressable.container, styles_pressable.container_common]}> 
            <Pressable
              style={[styles_pressable.pressable, styles.pressable_quit]}
              android_ripple={android_ripple_style}
              onPress={onPressLogout}
            >
              <Text style={styles_text.bold_white_20}>  Logout  </Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: color_button_lightgreen,
  },

  pressable_quit: {
    backgroundColor: "#a22",
  },
});
