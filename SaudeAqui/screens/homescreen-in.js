
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import RNLocation from 'react-native-location';

import axios from 'axios';
import Logo from '../assets/svg/logocolor.svg';
import auth from '@react-native-firebase/auth';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Busca from '../assets/svg/buscar-press.svg'
export default function Homescreen({ navigation }){

  const [user, setUser] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [hospitais, setHospitais] = useState();

  const myCoordinate = {latitude, longitude};

RNLocation.configure({
  distanceFilter: 1, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})

RNLocation.requestPermission({
  ios: "whenInUse",
  android: {
    detail: "coarse",
    rationale: {
      title: "Precisamos de sua permissão!",
      message: "Para te ajudar a encontrar os hospitais mais próximos, precisamos saber onde está!",
      buttonPositive: "OK",
      buttonNegative: "Cancele"
    }
}}).then(granted => {
    if (granted) {
      RNLocation.subscribeToLocationUpdates(locations => {
      setLongitude(locations[0].longitude)
      setLatitude(locations[0].latitude)
      })
    }
})

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(latitude, longitude)
    function hospitalCall(){
      try{
        const hospitalListener = axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=doctor&key=AIzaSyAOsYPfjqzVb95coljmrL16TrWQm95tlyI`)
        console.log(hospitalListener);
        const { results } = hospitalListener;
        setHospitais(results);
      } catch(e){
        console.log(e)
      }
    }
  hospitalCall()
  }, []);

  async function logOut(){
    console.log(user.email);
    try{
      await auth().signOut();
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <>
    <View style={styles.buscaView}>
    <TextInput style={styles.searchInput} placeholder={'Busque um hospital'}/>
    <TouchableOpacity style={styles.buscar}>
    <Busca/>
    </TouchableOpacity>
    </View>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    <Marker
      coordinate={myCoordinate}
      title='Aqui está você!'
      description='Verificaremos os hospitais mais próximos.'
      image={require('../assets/png/enderecor.png')}
    />
    </MapView>
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
    marginTop: '5%',
    marginBottom: '2%'
  },
  buttonG: {
    backgroundColor:'#F3434D',
    borderRadius: 50,
    height: '3%',
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
  map: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchInput: {
    paddingLeft: "4%", 
    position: 'relative',
    marginTop: '6%',
    backgroundColor: 'white',
    height: 40,
    width: '80%',
    borderRadius: 50,
  },
  buscar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3%',
    marginTop: '5%',
    width: 43,
    height: 43,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  buscaView: {
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '10%'
  }
});

