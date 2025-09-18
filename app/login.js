import React, { useState } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity,  Alert,  Image,  StyleSheet,  KeyboardAvoidingView,  Platform,  ScrollView,} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  const handleLogin = async () => {
    if (!correo || !clave) {
      Alert.alert('Por favor ingresa correo y contraseña');
      return;
    }

    const { user, error } = await supabase.auth.signIn({
      email: correo,
      password: clave,
    });

    if (error) {
      Alert.alert('Error de autenticación', error.message);
    } else if (user) {
      Alert.alert('¡Inicio de sesión exitoso!');
      router.push('/inicio'); // o '/perfil' si así lo deseas
    } else {
      Alert.alert('Error desconocido al iniciar sesión');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.fondo}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image source={require('../assets/icono-login.png')} style={styles.logo} />
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.icon}>📧</Text>
            <TextInput
              placeholder="Correo"
              value={correo}
              onChangeText={setCorreo}
              style={styles.input}
              placeholderTextColor="#888"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.icon}>🔒</Text>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              value={clave}
              onChangeText={setClave}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text style={styles.botonTexto}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/registro')}>
            <Text style={styles.enlace}>
              ¿Aún no tienes una cuenta? <Text style={styles.enlaceDestacado}>Registrarse</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#A3DFF0',
  },
  scroll: {
    padding: 30,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 6,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#5DC1E5',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 5,
  },
  botonTexto: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  enlace: {
    marginTop: 15,
    textAlign: 'center',
    color: '#7a7a7a',
    fontSize: 14,
  },
  enlaceDestacado: {
    color: '#2a82c9',
    fontWeight: '600',
  },
});
