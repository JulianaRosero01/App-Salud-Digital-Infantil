import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const user = supabase.auth.user(); // versión v1
      if (!user) {
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (error) {
        console.error('Error cargando perfil:', error.message);
      } else {
        setUsuario(data);
      }
      setCargando(false);
    };

    obtenerUsuario();
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#5DC1E5" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.cargando}>
        <Text style={styles.error}>No se encontró el usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/icono-login.png')}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Perfil del Usuario</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.valor}>{usuario.correo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A3DFF0',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  cargando: {
    flex: 1,
    backgroundColor: '#A3DFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: -150,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});
