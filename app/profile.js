import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function profile() {
  const router = useRouter();

  const nombreNino = "Juliana Rosero"; // Luego lo traerás de AsyncStorage o contexto

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>

        
        <TouchableOpacity onPress={() => router.back()}>
           <Ionicons name="arrow-back-outline" size={26} color="#1c5e7aff" />
         </TouchableOpacity>

          <Image source={require("../assets/icono-inicio.png")} style={styles.logo} resizeMode="contain"/>
        <Text style={styles.title}>Perfil del niño</Text>
      </View>

      {/* Información del niño */}
      <View style={styles.profileCard}>
        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={70} color="#1c5e7aff" />
          <View>
            <Text style={styles.name}>{nombreNino}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/editar-perfil")}
            >
              <Ionicons name="create-outline" size={18} color="#ffffff" />
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Agregar otro niño */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/registro-nino")}
      >
        <Ionicons name="add-circle-outline" size={26} color="#ffffff" />
        <Text style={styles.addText}>Agregar otro niño</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#bde4eeff",
    padding: 15,
  },
   header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: -20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingLeft: 8,
  
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    marginRight: 105,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop:20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#51b3ddff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  editText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 13,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c5e7aff",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 40,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
