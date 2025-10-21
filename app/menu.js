// app/menu.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header con título */}
      <Text style={styles.title}>Menú Principal</Text>

      {/* Grid de botones */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="phone-portrait-outline" size={40} color="#00c3ffff" />
          <Text style={styles.cardText}>Dispositivos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="nutrition-outline" size={40} color="#00c3ffff" />
          <Text style={styles.cardText}>Alimentación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="moon-outline" size={40} color="#00c3ffff" />
          <Text style={styles.cardText}>Sueño</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="fitness-outline" size={40} color="#00c3ffff" />
          <Text style={styles.cardText}>Motricidad</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de gestionar niños */}
      <TouchableOpacity
        style={[styles.card, styles.fullWidthCard]}
        onPress={() => router.push("/gestionarNinos")}
      >
        <Ionicons name="people-outline" size={40} color="#00c3ffff" />
        <Text style={styles.cardText}>Gestionar Niños (1)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00c3ffff",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#F2F7FF",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "48%", // dos columnas
  },
  fullWidthCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#00c3ffff",
    textAlign: "center",
  },
});
