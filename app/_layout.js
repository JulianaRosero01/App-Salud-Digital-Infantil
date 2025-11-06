// app/_layout.js
import 'react-native-url-polyfill/auto';
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#bde4eeff" },
      }}
    >
      {/* 👇 este será el que decide a dónde ir */}
      <Stack.Screen name="index" />

      <Stack.Screen name="welcome" />
      <Stack.Screen name="home" />
      <Stack.Screen name="perfil" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="notificaciones" />
    </Stack>
  );
}
