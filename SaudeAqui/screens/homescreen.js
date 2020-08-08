import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';

import Logo from '../assets/svg/logocolor.svg';
import Google from '../assets/svg/google.svg';
import Facebook from '../assets/svg/facebook.svg';
import auth from '@react-native-firebase/auth';

export default function LoginPage({ navigation }) {

  const [Email, setEmail] = useState([]);
  const [Password, setPassword] = useState([]);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if(!!user){
    navigation.navigate('Homescreen');
    }
    return subscriber;
  }, []);

  async function login(){
    try {
    await auth()
    .signInWithEmailAndPassword(Email, Password).then(navigation.navigate('Homescreen'));
    } catch(err){
    console.log(err);
    }
  }

    return (
      <>
        <View style={styles.container}>
           <StatusBar barStyle='light' backgroundColor='#0DAF9A'/>
           <Logo style={styles.logo}/>
           <View style={styles.textContainer}>
               <Text style={styles.h5}>e-mail</Text>
               <TextInput style={styles.textInput} placeholder="example@email.com" inlineImageLeft='email' inlineImagePadding={10} onChangeText={email => setEmail(email)}/>
               <Text style={styles.h5}>senha</Text>
               <TextInput style={styles.textInput} placeholder="**********" textContentType="password" secureTextEntry={true} inlineImageLeft='password' inlineImagePadding={10} onChangeText={pass => setPassword(pass)}/>
               <TouchableOpacity>
                  <Text style={styles.h4}>ESQUECEU SUA SENHA?</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button1} onPress={()=> {login()}}>
                  <Text style={styles.buttonTxt}>entrar</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.buttonTxt}>cadastre-se</Text>
               </TouchableOpacity>
           </View>
           <View style={styles.container2}>
               <TouchableOpacity style={styles.buttonG}>
                  <Google style={styles.logos}/>
                  <Text style={styles.buttonTxtLogin}>entrar</Text>
               </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonF}>
                  <Facebook style={styles.logos}/>
                  <Text style={styles.buttonTxtLogin}>entrar</Text>
               </TouchableOpacity>
           </View>
        </View>
      </>
    ); 
  
}

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
  container2: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width:'100%',
    flexDirection: 'row',
    height: '5%'
  },
  buttonG: {
    backgroundColor:'#F3434D',
    borderRadius: 50,
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonF: {
    marginLeft: '5%',
    backgroundColor:'#0081A8',
    borderRadius: 50,
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonTxtLogin: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '5%'
  },
});

