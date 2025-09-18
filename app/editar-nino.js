import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function FormularioNino({ route }) {
  const isEdit = route?.params?.edit ?? false;
  const [nombre, setNombre] = useState(route?.params?.nombre || '');
  const [edad, setEdad] = useState(route?.params?.edad || '');
  const [foto, setFoto] = useState(route?.params?.foto || null);

  const elegirFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const guardarNino = () => {
    // Aquí puedes guardar a la base de datos o estado global
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{isEdit ? 'Editar Niño' : 'Agregar Niño'}</Text>

      <TouchableOpacity onPress={elegirFoto} style={styles.fotoContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} />
        ) : (
          <Text style={styles.textoSeleccionarFoto}>Seleccionar Foto</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre del niño"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.boton} onPress={guardarNino}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C9F0FF',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004080',
  },
  fotoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textoSeleccionarFoto: {
    color: '#004080',
    fontSize: 14,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#cce0ff',
    borderWidth: 1,
    color: '#000',
  },
  boton: {
    backgroundColor: '#0074cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

