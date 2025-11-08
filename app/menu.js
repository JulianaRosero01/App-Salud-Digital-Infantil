import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={26} color="#1c5e7aff" />
              </TouchableOpacity>
              
                 <Image source={require("../assets/icono-inicio.png")} style={styles.logo} resizeMode="contain"/>
              <Text style={styles.title}>Menú</Text>
            </View>
      

      {/* Grid de botones */}
      <View style={styles.grid}>

        <TouchableOpacity style={styles.card} onPress={() => router.push("../areas/dispositivos")}>
          <Ionicons name="phone-portrait-outline" size={40} color="#1c5e7aff" />
          <Text style={styles.cardText}>Dispositivos</Text>
        </TouchableOpacity>

        

        <TouchableOpacity style={styles.card} onPress={() => router.push("../areas/alimentacion")}>
          <Ionicons name="nutrition-outline" size={40} color="#1c5e7aff" />
          <Text style={styles.cardText}>Alimentación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("../areas/sueno")}>
          <Ionicons name="moon-outline" size={40} color="#1c5e7aff" />
          <Text style={styles.cardText}>Sueño</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="fitness-outline" size={40} color="#1c5e7aff" />
          <Text style={styles.cardText}>Motricidad</Text>
        </TouchableOpacity>
      </View>

      
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
    color: "#000000ff",
    
  },
    header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 170,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginLeft:-130,
    },
    logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
    marginRight:60,
    marginLeft:20,
    
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    padding:20,
    
  },
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "48%", // dos columnas
    elevation:5,
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
    color: "#1c5e7aff",
    textAlign: "center",
  },
});
