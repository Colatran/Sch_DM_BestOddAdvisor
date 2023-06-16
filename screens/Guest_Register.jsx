import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import{ collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { app, db, users } from '../firebase.config';

import Input_Avatar from '../components/Input_Avatar';
import Input_Text from '../components/Input_Text';
import Input_Password from '../components/Input_Password';
import Input_Date from '../components/Input_Date';

import { android_ripple_style, styles_common, styles_pressable, styles_text } from '../styles/styles_common';
import { validateEmail, validateName, validatePass, validatePassConfirm, validateBirthDate } from '../utils/Validations';



export default function Guest_Register({ navigation }) {
  const [image, setImage]         = useState(null);
  const [email, setEmail]         = useState('');
  const [name, setName]           = useState('');
  const [pass, setPass]           = useState('');
  const [passConf, setPassConf]   = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  const [hide, setHide] = useState(true);

  const [valid_Email, setValid_Email]         = useState(true);
  const [valid_Name, setValid_Name]           = useState(true);
  const [valid_Pass, setValid_Pass]           = useState(true);
  const [valid_PassConf, setValid_PassConf]   = useState(true);
  const [valid_BirthDate, setValid_BirthDate] = useState(true);



  const onPressRegister = async () => {
    var valid = {
      valid: true
    };
    
    validateEmail(valid, email, setValid_Email);
    validateName(valid, name, setValid_Name);
    validatePass(valid, pass, setValid_Pass);
    validatePassConfirm(valid, pass, passConf, setValid_PassConf);
    validateBirthDate(valid, birthDate, setValid_BirthDate);

    if (valid_Name) {
      const usersRef = collection(db, users);
      const q = query(usersRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      
      if(querySnapshot.docs.length > 0) {
        setValid_Name(false);
        valid.valid = false;
      }
    }

    if (valid.valid) {
      try {
        const auth = getAuth(app);
        const userCred = await createUserWithEmailAndPassword(auth, email, pass);
        sendEmailVerification(userCred.user);
        
        const usersRef = collection(db, users);
        const user = {
          isAdmin: false,
          uid: userCred.user.uid,
          name: name,
          email: email,
          birthDate: birthDate,
          image: image
        };        
        addDoc(usersRef, user)
        .catch((error) => { console.error('Error adding document: ', error);});

        navigation.navigate('Login');

      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setValid_Email(false);
          break;
          case 'auth/weak-password':
            setValid_Pass(false);
          break;
          default:
            console.log(error);
        }
      }
    }      
  }



  return (
    <View style={styles_common.container}>

      <ScrollView>

        <View>
          <Input_Avatar
            image={image}
            setImage={setImage}
          />
          <Input_Text 
            label= 'Email'
            placeholder= 'exemplo@mail.com'
            value = {email}
            setValue = {setEmail}
            valid = {valid_Email}
            errorMsg= 'Este Email não é válido!'
          />
          <Input_Text 
            label='Nome'
            placeholder= ''
            value = {name}
            setValue = {setName}
            valid = {valid_Name}
            errorMsg= 'Este nome é inválido ou já foi utilizado!'
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
              style={[styles_pressable.pressable, styles_pressable.pressable_regist]}
              android_ripple={android_ripple_style}
              onPress={onPressRegister}
            >
              <Text style={styles_text.bold_white_20}>  REGISTAR  </Text>
            </Pressable>
          </View>

        </View>

      </ScrollView>

    </View>
  );
  
}