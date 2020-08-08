
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Register({ navigation }) {

  const [Name, setName] = useState([]);
  const [Age, setAge] = useState([]);
  const [Adress, setAdress] = useState([]);
  const [Email, setEmail] = useState([]);
  const [Password, setPassword] = useState([]);

  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    navigation.navigate('Homescreen');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  async function register(){
    try{
       await auth()
       .createUserWithEmailAndPassword(Email, Password);
       await firestore().collection('Users')
      .add({
        Name,
        Age,
        Adress,
        Email,
        Password,
      }).then(() => {
        console.log('User added!');
      });
        navigation.navigate('Homescreen');
    } catch(err){
        console.log(err);
    }
  }

  return (
      <>
         <View style={styles.container}>
           <StatusBar barStyle='light' backgroundColor='#0DAF9A'/>
           <Text style={styles.h1}>Cadastro</Text>
           <View style={styles.textContainer}>
               <Text style={styles.h5}>nome completo</Text>
               <TextInput style={styles.textInput} placeholder="ex: Daniel Gomes de Carvalho" value={Name} inlineImageLeft='pessoa' inlineImagePadding={10} onChangeText={name => setName(name)}/>
               <Text style={styles.h5}>idade</Text>
               <TextInput style={styles.textInput} placeholder="ex: 15" value={Age} inlineImageLeft='data' keyboardType='number-pad' inlineImagePadding={10} onChangeText={age => setAge(age)}/>
               <Text style={styles.h5}>endereço</Text>
               <TextInput style={styles.textInput} placeholder="Rua, 00 - Bairro" value={Adress} inlineImageLeft='endereco' inlineImagePadding={10} onChangeText={adress => setAdress(adress)}/>
               <Text style={styles.h5}>e-mail</Text>
               <TextInput style={styles.textInput} placeholder="example@email.com" value={Email} inlineImageLeft='email' inlineImagePadding={10} onChangeText={email => setEmail(email)}/>
               <Text style={styles.h5}>senha</Text>
               <TextInput style={styles.textInput} placeholder="**********" value={Password} textContentType="password" secureTextEntry={true} inlineImageLeft='password' inlineImagePadding={10} onChangeText={pass => setPassword(pass)}/>
               <TouchableOpacity style={styles.button2} onPress={register}>
                  <Text style={styles.buttonTxt}>cadastrar</Text>
               </TouchableOpacity>
           </View>
         </View>
         </>
    ); 
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: '27%'
  },
  textContainer: {
    paddingLeft: '15%',
    marginTop: '15%',
    textAlign:'left',
    width:'100%',
  },
  h5: {
    color:'#0DAF9A',
    fontWeight: '800',
    fontSize: 11,
    marginTop: '5%'
  },
  h1: {
    color:'#0DAF9A',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '5%'
  },
  h4: {
    marginLeft: '20%',
    color:'#0DAF9A',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: '5%',
    marginBottom: '10%'
  },
  textInput:{
    width:'80%',
    borderBottomWidth: 1,
    borderBottomColor:'#0DAF9A',
  },
  button1: {
    backgroundColor:'#0DAF9A',
    borderRadius: 50,
    height: '9%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTxt: {
    fontWeight: 'bold',
    color: '#fff',
  },
  button2: {
    marginTop: '5%',
    backgroundColor:'#4EBFB1',
    borderRadius: 50,
    height: '9%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTxtLogin: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '5%'
  },
});

