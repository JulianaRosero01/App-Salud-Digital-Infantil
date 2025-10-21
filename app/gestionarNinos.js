import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function GestionarNinos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gestión de Niños</Text>
          <Text style={styles.subTitle}>1 niño registrado</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de niño */}
        <View style={styles.childCard}>
          <View style={styles.childHeader}>
            <Text style={styles.childName}>👶 Juliana Rosero</Text>
            <Text style={styles.activeTag}>Activo</Text>
          </View>
          <Text style={styles.childInfo}>0-2 años • niña</Text>
          <Text style={styles.sectionLabel}>Dieta:</Text>
          <Text style={styles.dietTag}>Alergias</Text>

          <Text style={styles.sectionLabel}>Recordatorios:</Text>
          <Text style={styles.reminder}>⏰ 09:00</Text>

          <Text style={styles.sectionLabel}>Enfoque:</Text>
          <View style={styles.tagsRow}>
            <Text style={styles.tag}>social</Text>
            <Text style={styles.tag}>sleep</Text>
          </View>

          <Text style={styles.sectionLabel}>Intereses:</Text>
          <View style={styles.tagsRow}>
            <Text style={styles.tag}>art</Text>
            <Text style={styles.tag}>games</Text>
            <Text style={styles.tag}>music</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color="#00c3ffff" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Agregar otro niño */}
        <TouchableOpacity style={styles.addAnotherCard}>
          <Ionicons name="add-circle-outline" size={30} color="#00c3ffff" />
          <Text style={styles.addAnotherText}>Agregar otro niño</Text>
          <Text style={styles.addAnotherSub}>Crea un perfil adicional para hermanos</Text>
        </TouchableOpacity>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Ionicons name="information-circle-outline" size={20} color="#00c3ffff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.tipTitle}>Consejos para múltiples niños</Text>
            <Text style={styles.tipText}>• Cada niño mantiene su progreso individual</Text>
            <Text style={styles.tipText}>• Puedes cambiar entre perfiles desde el selector</Text>
            <Text style={styles.tipText}>• Los recordatorios se configuran por separado</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="home-outline" size={24} color="#00c3ffff" />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notificaciones")}>
          <Ionicons name="notifications-outline" size={24} color="#00c3ffff" />
          <Text style={styles.footerText}>Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Ionicons name="person-outline" size={24} color="#00c3ffff" />
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/menu")}>
          <Ionicons name="menu-outline" size={24} color="#00c3ffff" />
          <Text style={styles.footerText}>Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20, paddingBottom: 100 },

  header: { marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#00c3ffff" },
  subTitle: { color: "#666", marginBottom: 10 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00c3ffff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  addButtonText: { color: "#fff", marginLeft: 5 },

  childCard: {
    backgroundColor: "#F2F7FF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  childHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  childName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  activeTag: {
    backgroundColor: "#00c3ffff",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
  },
  childInfo: { color: "#666", marginBottom: 10 },
  sectionLabel: { marginTop: 8, fontWeight: "bold", color: "#444" },
  dietTag: {
    backgroundColor: "#FFD6D6",
    color: "#D32F2F",
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  reminder: { color: "#333", marginTop: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  tag: {
    backgroundColor: "#E6F0FF",
    color: "#00c3ffff",
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#00c3ffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  editButtonText: { color: "#00c3ffff", marginLeft: 5 },

  addAnotherCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#00c3ffff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  addAnotherText: { color: "#00c3ffff", fontWeight: "bold", marginTop: 10 },
  addAnotherSub: { color: "#666", fontSize: 12, marginTop: 4, textAlign: "center" },

  tipsCard: {
    backgroundColor: "#F2F7FF",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipTitle: { fontWeight: "bold", color: "#00c3ffff", marginBottom: 5 },
  tipText: { fontSize: 12, color: "#444" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  footerText: { fontSize: 12, color: "#00c3ffff", marginTop: 4, textAlign: "center" },
});
