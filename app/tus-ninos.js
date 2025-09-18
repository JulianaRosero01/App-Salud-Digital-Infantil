import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';


export default function TusNinos() {
  
    const [ninos, setNinos] = useState([
    {
      nombre: 'Manuel Alejandro',
      edad: '5 años',
      foto: require('../assets/nino1.jpg'),
    },
    {
      nombre: 'Cristian David',
      edad: '3 años',
      foto: require('../assets/nino2.jpg'),
    },
  ]);
  
const eliminarNino = (index) => {
    const nuevos = [...ninos];
    nuevos.splice(index, 1);
    setNinos(nuevos);
  };
  return (
    <View style={styles.fondo}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Image source={require('../assets/icono-inicio.png')} style={styles.logo} />
          <Text style={styles.titulo}>Tus niños</Text>
          <Image source={require('../assets/avatarn.png')} style={styles.avatar} />
        </View>

        {/* LISTADO DE NIÑOS */}
        {ninos.map((nino, index) => (
          <View key={index} style={styles.card}>
            <Image source={nino.foto} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{nino.nombre}</Text>
              <Text style={styles.edad}>{nino.edad}</Text>
            </View>
            <View style={styles.botones}>
  <TouchableOpacity onPress={() => router.push('/editar-nino')}>
    <Text style={{ color: '#2E86DE' }}>Editar</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => eliminarNino(index)}>
    <Text style={{ color: 'red' }}>Eliminar</Text>
  </TouchableOpacity>
</View>

          </View>
        ))}
      </ScrollView>

      {/* BOTÓN FLOTANTE DE AGREGAR */}
      <TouchableOpacity style={styles.botonAgregar} onPress={() => router.push('/editar-nino')}>
    <Text style={styles.mas}>+</Text>
    </TouchableOpacity>
    
        {/* Barra inferior */}
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
  fondo: {
    flex: 1,
    backgroundColor: '#C9F0FF',
  },
  scroll: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
   logo: {
  width: 100, // ajusta si deseas más grande
  height: 80,
  resizeMode: 'contain',
  marginRight: -25,
  marginLeft: -15,
  marginTop: -5,
},
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  edad: {
    fontSize: 14,
    color: '#666',
  },
  botonEditar: {
    backgroundColor: '#D7F0FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoEditar: {
    fontSize: 12,
    color: '#007AFF',
  },
 botonAgregar: {
  position: 'absolute',
  bottom: 410, 
  right: 20,
  backgroundColor: '#E0F7FF',
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 5,
},

  mas: {
    fontSize: 24,
    color: '#007AFF',
  },
  botones: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
  gap: 20,
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
