import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Sueno() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="moon-outline" size={40} color="#4b6cb7" />
        <Text style={styles.title}>Sueño y descanso</Text>
      </View>

     

      {/* Introducción breve */}
      <Text style={styles.intro}>
        Un buen descanso es clave para el desarrollo físico, mental y emocional
        de los niños. Aquí te compartimos algunos consejos para fomentar hábitos
        de sueño saludables 🌙
      </Text>

      {/* Bloques o tarjetas */}
      <View style={styles.tipsContainer}>
        <View style={styles.tipCard}>
          <Ionicons name="time-outline" size={28} color="#4b6cb7" />
          <Text style={styles.tipText}>
            Mantén horarios fijos para dormir y despertar.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="bed-outline" size={28} color="#4b6cb7" />
          <Text style={styles.tipText}>
            Crea una rutina relajante antes de dormir, como leer un cuento 📖.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="tv-outline" size={28} color="#4b6cb7" />
          <Text style={styles.tipText}>
            Evita pantallas al menos 1 hora antes de dormir.
          </Text>
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="sparkles-outline" size={28} color="#4b6cb7" />
          <Text style={styles.tipText}>
            Mantén el dormitorio oscuro, tranquilo y cómodo 🌙.
          </Text>
        </View>
      </View>

      {/* Cierre */}
      <Text style={styles.footerText}>
        💭 Recuerda: un niño que duerme bien aprende mejor, tiene más energía y
        un mejor estado de ánimo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fbff",
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c3d5a",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  intro: {
    fontSize: 15,
    color: "#333",
    marginBottom: 20,
    textAlign: "justify",
  },
  tipsContainer: {
    gap: 15,
  },
  tipCard: {
    backgroundColor: "#e8f0fe",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: "#1c3d5a",
  },
  footerText: {
    marginTop: 25,
    fontSize: 15,
    textAlign: "center",
    color: "#3d4a5c",
    fontStyle: "italic",
  },
});
