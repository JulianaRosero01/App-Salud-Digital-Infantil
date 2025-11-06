import 'react-native-url-polyfill/auto';
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🔧 aplica a todas las pantallas
        contentStyle: { backgroundColor: "#bde4eeff" }, // color base de fondo
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="perfil" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="notificaciones" />
    </Stack>
  );
}