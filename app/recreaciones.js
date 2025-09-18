import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function Recreaciones() {
  return (
    <View style={styles.container}>
      {/* Contenido scrollable */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image source={require('../assets/icono-inicio.png')} style={styles.logo} />
          <Text style={styles.title}>Recreaciones</Text>
          <Image source={require('../assets/avatarj.png')} style={styles.avatar} />
        </View>

        {/* Introducción */}
        <Text style={styles.description}>
          ¡El juego es esencial! Descubre un sinfín de ideas divertidas y activas para que tus hijos se muevan,
          exploren el mundo que les rodea y desarrollen habilidades sociales y emocionales clave. Desde juegos al aire libre
          hasta actividades en casa, ¡encuentra la inspiración para transformar cualquier momento en una oportunidad de aprendizaje y alegría en familia!
        </Text>

        {/* Bloque 1 */}
        <Text style={styles.subheading}>Juegos recreacionales</Text>
        <Text style={styles.subtext}>
          Búsqueda del tesoro, carreras de sillas y yoga para niños. Estas actividades promueven el ejercicio físico.
        </Text>
        <TouchableOpacity onPress={() => router.push('/video3')}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/xq8l8lk1v8I/hqdefault.jpg' }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>

        {/* Bloque 2 */}
        <Text style={styles.subheading}>Juegos en familia</Text>
        <Text style={styles.subtext}>
          Tarde de juegos interactivos en familia. Fortalecen los lazos familiares y estimulan la creatividad.
        </Text>
        <TouchableOpacity onPress={() => router.push('/video4')}>
          <Image
            source={{ uri: 'https://img.youtube.com/vi/JC1b43KK9xY/hqdefault.jpg' }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Barra inferior fija */}
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
    padding: 16,
    paddingBottom: 90, // Espacio para la navbar
  },
  scrollContent: {
    paddingBottom: 100,
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
    color: '#000',
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
    width: '115%',
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
