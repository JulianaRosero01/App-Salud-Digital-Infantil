import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function Recomendaciones() {
  return (
    <View style={styles.container}>
      {/* Scroll solo para el contenido */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image source={require('../assets/icono-inicio.png')} style={styles.logo} />
          <Text style={styles.title}>Recomendaciones</Text>
          <Image source={require('../assets/avatarr.png')} style={styles.avatar} />
        </View>

        {/* Texto descriptivo */}
        <Text style={styles.description}>
          Sabemos que navegar en el mundo digital con nuestros hijos puede ser un desafío. Aquí encontrarás guías,
          herramientas y consejos útiles, organizados por tipo de dispositivo y tema, para ayudarte a fomentar hábitos
          tecnológicos positivos y un equilibrio saludable en toda la familia.
        </Text>

        {/* Botones */}
       <TouchableOpacity style={styles.boton} onPress={() => router.push('/reco-telefono')}>
        <Text style={styles.botonTexto}>Para teléfono y Tablet</Text>
        <View style={styles.iconoContainer}>
            <Image source={require('../assets/telefono.png')} style={styles.botonIcono} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => router.push('/reco-television')}>
        <Text style={styles.botonTexto}>Para la television</Text>
        <View style={styles.iconoContainer}>
            <Image source={require('../assets/television.png')} style={styles.botonIcono} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => router.push('/reco-consola')}>
        <Text style={styles.botonTexto}>Para consola y videojuesgos</Text>
        <View style={styles.iconoContainer}>
            <Image source={require('../assets/consola.png')} style={styles.botonIcono} />
        </View>
        </TouchableOpacity>

        {/* Recomendaciones extra */}
        <Text style={styles.pregunta}>¿Qué te recomendamos para que tus niños eviten usar estos dispositivos?</Text>
        <View style={styles.recomendaciones}>
        <View style={styles.recoItem}>
            <TouchableOpacity onPress={() => router.push('/manualidades')}>
            <Image source={require('../assets/manualidades.png')} style={styles.recomendacionIcono} />
            </TouchableOpacity>
            <Text style={styles.recoTexto}>Manualidades</Text>
        </View>

        <View style={styles.recoItem}>
            <TouchableOpacity onPress={() => router.push('/recreaciones')}>
            <Image source={require('../assets/recreaciones.png')} style={styles.recomendacionIcono} />
            </TouchableOpacity>
            <Text style={styles.recoTexto}>Recreaciones</Text>
        </View>
        </View>


        {/* Aquí puedes seguir agregando más texto y contenido si lo deseas */}
      </ScrollView>

      {/* BARRA FIJA */}
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
    backgroundColor: '#cceeff',
    padding: 20,
    paddingBottom: 70, // espacio para la barra
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: {
  width: 100, // ajusta si deseas más grande
  height: 80,
  resizeMode: 'contain',
  marginRight: -25,
  marginLeft: -15,
  marginTop: -5,
},
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004080',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'justify',
  },
boton: {
    width: 300, // o usa un valor fijo como 300
  alignSelf: 'center', // centra el botón horizontalmente
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#e6f7ff',
  paddingVertical: 14,
  paddingHorizontal: 18,
  borderRadius: 40,
  marginBottom: 16,
  justifyContent: 'space-between',
  borderWidth: 2,
  borderColor: '#2EB6E0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
botonTexto: {
  fontSize: 15,
  color: '#004080',
  fontWeight: '600',
},
iconoContainer: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 25,
},
botonIcono: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},

  pregunta: {
    fontSize: 14,
    marginVertical: 14,
    textAlign: 'center',
    color: '#333',
  },
  recomendaciones: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  recomendacionIcono: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius:40,
    marginBottom:15,
    borderWidth: 2,
    borderColor: '#2EB6E0',
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
  contentContainerStyle:{
    paddingBottom: 100 
},
recoItem: {
  alignItems: 'center',
  marginHorizontal: 10,
},
recoTexto: {
  marginTop: 6,
  fontSize: 13,
  color: '#004080',
  fontWeight: '500',
  marginBottom:30,
},

});

