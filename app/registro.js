import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false); // Para evitar doble clic

  const handleRegistro = async () => {
  if (!nombre || !apellido || !correo || !clave || !confirmar) {
    Alert.alert('Completa todos los campos');
    return;
  }
  if (clave !== confirmar) {
    Alert.alert('Las contraseñas no coinciden');
    return;
  }

  try {
    setLoading(true);

    const { user, error: errorSignUp } = await supabase.auth.signUp({
      email: correo,
      password: clave,
    });

    if (errorSignUp) {
      Alert.alert('Error al registrarse', errorSignUp.message);
      setLoading(false);
      return;
    }

    if (!user || !user.id) {
      Alert.alert('Error inesperado al registrar el usuario');
      setLoading(false);
      return;
    }

    const nombreCompleto = `${nombre} ${apellido}`;

    const { error: errorInsert } = await supabase
      .from('usuarios')
      .insert([
        {
          auth_id: user.id,
          nombre: nombreCompleto,
          correo: correo,
        },
      ]);

    if (errorInsert) {
      Alert.alert('Error al guardar datos del usuario', errorInsert.message);
      setLoading(false);
      return;
    }

    Alert.alert('✅ Registro exitoso', 'Ya puedes iniciar sesión.');
    router.push('/login');
  } catch (e) {
    console.error('Excepción en registro:', e);
    Alert.alert('Error inesperado al registrar');
  } finally {
    setLoading(false);
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
          <TextInput
            placeholder="Primer nombre"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Primer apellido"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            placeholder="Correo"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            value={correo}
            onChangeText={setCorreo}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={clave}
            onChangeText={setClave}
          />
          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />

          <TouchableOpacity style={styles.boton} onPress={handleRegistro} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botonTexto}>REGISTRAR</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.enlace}>
              ¿Ya tienes una cuenta? <Text style={styles.enlaceColor}>Ingresar</Text>
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
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: -30,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -50,
    marginVertical: -60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginTop: 0,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 6,
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#74c2e1',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  enlace: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  enlaceColor: {
    color: '#2a82c9',
    fontWeight: 'bold',
  },
});
