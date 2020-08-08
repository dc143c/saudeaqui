
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

import Logo from '../assets/svg/logocolor.svg';
import auth from '@react-native-firebase/auth';

export default function Homescreen({ navigation }){

  const [Email, setEmail] = useState([]);
  const [Senha, setSenha] = useState([]);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    navigation.navigate('Homescreen');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <>
    <View style={styles.container}>
    <Logo/>
    <Text style={styles.h5}> This is our Homepage! </Text>
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
  h5: {
    color:'#0DAF9A',
    fontWeight: '800',
    fontSize: 11,
    marginTop: '5%'
  },
});

