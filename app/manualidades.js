import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function Manualidades() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Image source={require('../assets/icono-inicio.png')} style={styles.logo} />
          <Text style={styles.title}>Manualidades</Text>
          <Image source={require('../assets/avatarm.png')} style={styles.avatar} />
        </View>

        {/* INTRODUCCIÓN */}
        <Text style={styles.description}>
          Descubre ideas fáciles y divertidas de manualidades que harán que tus hijos exploren su imaginación mientras desarrollan habilidades clave para escribir, dibujar y mucho más. ¡Mira nuestros videos cortos y aprende cómo actividades sencillas impulsan su motricidad fina y fortalecen su confianza! ¡Tiempo de calidad creando juntos!
        </Text>

        {/* BLOQUE 1 */}
        <Text style={styles.subheading}>Juegos divertidos</Text>
        <Text style={styles.subtext}>
          5 juegos muy divertidos para hacer con material reciclado. Todo esto fomenta la creatividad e imaginación de los niños.
        </Text>
        <TouchableOpacity onPress={() => router.push('/video1')}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/QAmKjeArXcU/hqdefault.jpg' }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>

        {/* BLOQUE 2 */}
        <Text style={styles.subheading}>Manualidades creativas</Text>
        <Text style={styles.subtext}>
          13 manualidades para niños muy fácil de hacer. Podrás entretenerlos estimulando su motricidad y creatividad con juegos divertidos.
        </Text>
        <TouchableOpacity onPress={() => router.push('/video2')}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/evqoJsud5Cg/hqdefault.jpg' }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* BARRA INFERIOR FIJA */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image source={require('../assets/play.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/notificacion.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/user.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9F0FF',
    position: 'relative',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // deja espacio para que no tape la navbar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginRight: -25,
    marginLeft: -15,
    marginTop: -5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#45b2d4',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 13,
    color: '#444',
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 25,
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
});
