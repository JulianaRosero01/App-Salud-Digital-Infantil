import 'react-native-url-polyfill/auto';
import React from 'react';
import {   View,  Text,  StyleSheet,  Image,  TouchableOpacity,  TextInput,  ScrollView,} from 'react-native';
import { router } from 'expo-router';

export default function Inicio() {
  return (
    <View style={styles.fondo}>
      {/* CABECERA */}
      <View style={styles.header}>
  <View style={styles.row}>
    <Image source={require('../assets/icono-inicio.png')} style={styles.logo} />
    <View style={styles.searchBox}>
      <TextInput
        placeholder="Buscar"
        placeholderTextColor="#777"
        style={styles.searchInput}
      />
      <Text style={styles.lupa}>🔍</Text>
    </View>
  </View>
</View>



      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/manualidades')}>
          <Image source={require('../assets/manualidades.png')} style={styles.cardImg} />
          <Text style={styles.cardText}>Manualidades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/tus-ninos')}>
          <Image source={require('../assets/ninos.png')} style={styles.cardImg} />
          <Text style={styles.cardText}>Tus niños</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/recomendaciones')}>
          <Image source={require('../assets/recomendaciones.png')} style={styles.cardImg} />
          <Text style={styles.cardText}>Recomendaciones</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/recreaciones')}>
          <Image source={require('../assets/recreaciones.png')} style={styles.cardImg} />
          <Text style={styles.cardText}>Recreaciones</Text>
        </TouchableOpacity>



      </ScrollView>

<View style={styles.navbar}>
  <TouchableOpacity onPress={() => router.push('/videos')}>
    <Image source={require('../assets/play.png')} style={styles.navIcon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push('/inicio')}>
    <Image source={require('../assets/home.png')} style={styles.navIcon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push('/notificaciones')}>
    <Image source={require('../assets/notificacion.jpg')} style={styles.navIcon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push('/perfil')}>
    <Image source={require('../assets/user.png')} style={styles.navIcon} />
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#C9F0FF',
  },
  header: {
  backgroundColor: '#A3DFF0',
  paddingTop: 50,
  paddingHorizontal: 20,
  paddingBottom: 10,
},
row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

logo: {
  width: 100, // ajusta si deseas más grande
  height: 80,
  resizeMode: 'contain',
  marginRight: -5,
  marginLeft: -25,
  marginTop: -45,
},
  
 searchBox: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 25,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  elevation: 4,
  height: 40,
  marginTop: -30,
},

searchInput: {
  flex: 1,
  fontSize: 14,
  color: '#333',
},

lupa: {
  fontSize: 18,
  marginLeft: 10,
},
card: {
  width: '47%',
  height: 250,                // 👈 Aumenta o ajusta si deseas más largo
  backgroundColor: '#E6F7FF',
  borderRadius: 15,
  padding: 10,
  alignItems: 'center',
  marginBottom: 20,
  borderWidth: 2,
  borderColor: '#84C6EF',
  shadowColor: '#74c2e1',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  elevation: 5,
  justifyContent: 'center',   // centra verticalmente
},

cardImg: {
  width: 150,
  height: 200,                 // 👈 esto hace que se alargue más
  resizeMode: 'contain',
  marginBottom: 6,
},


 cardText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#2c3e50',
  textAlign: 'center',
},

  navbar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
  },
  grid: {
  padding: 20,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

});
