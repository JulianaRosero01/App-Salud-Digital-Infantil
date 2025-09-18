import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Sueno() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0057FF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sueño</Text>
        <Ionicons name="moon-outline" size={24} color="#0057FF" />
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Rutinas de descanso reparador</Text>
        <Text style={styles.text}>
          Aquí encontrarás consejos y actividades para mejorar los hábitos de sueño de tu hijo.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>🛏 Establece una rutina nocturna consistente</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>📖 Leer un cuento antes de dormir ayuda a relajarse</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>🌙 Evita pantallas al menos 1 hora antes de dormir</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: "#0057FF" },
  content: { padding: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#0057FF" },
  text: { fontSize: 14, color: "#444", marginBottom: 15 },
  card: {
    backgroundColor: "#E6F0FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  cardText: { fontSize: 14, color: "#333" },
});
