import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Home() {
   const router = useRouter();
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="happy-outline" size={30} color="#0057FF" />
        <View style={styles.profileBox}>
          <Text style={styles.profileName}>Juliana Rosero</Text>
          <Text style={styles.profileAge}>3-5 años</Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="#0057FF" />
      </View>

      {/* SCROLL CENTRAL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Buenas tardes!</Text>
          <Text style={styles.cardSubtitle}>
            Un momento especial para Juliana Rosero
          </Text>
          <Text style={styles.reminder}>⏰ Recomendación a las 09:00</Text>
        </View>

        {/* Progreso */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Progreso de Juliana Rosero</Text>
          <Text style={styles.progress}>0/30 actividades completadas</Text>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>¡Comienza la primera actividad!</Text>
          </TouchableOpacity>
        </View>

        {/* Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Insights para 0-2 años</Text>
          <Text style={styles.insightItem}>🧠 Desarrollo Cognitivo: Aprende con juegos de memoria</Text>
          <Text style={styles.insightItem}>🎨 Habilidades Sociales: Interacciones con otros niños</Text>
          <Text style={styles.insightItem}>🏃 Desarrollo Motor: Juegos de coordinación</Text>
        </View>

        {/* Áreas prioritarias */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* ...otros bloques */}

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/sueno")}
        >
          <Ionicons name="moon-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Sueño</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/social")}
        >
          <Ionicons name="people-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Social</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/alimentacion")}
        >
          <Ionicons name="fast-food-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Alimentación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/aprendizaje")}
        >
          <Ionicons name="book-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Aprendizaje</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/motricidad")}
        >
          <Ionicons name="walk-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Motricidad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/dispositivos")}
        >
          <Ionicons name="phone-portrait-outline" size={24} color="#0057FF" />
          <Text style={styles.gridText}>Dispositivos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

        {/* Recomendaciones */}
        <View style={styles.cardHighlight}>
          <Text style={styles.sectionTitle}>Recomendaciones Personalizadas</Text>
          <Text style={styles.recoText}>
            Para Juliana Rosero: Basado en sus gustos por arte y juegos, 
            te recomendamos actividades creativas.
          </Text>
        </View>

        {/* Consejo experto */}
        <View style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Consejo Experto del Día</Text>
          <Text style={styles.insightItem}>
            📖 La lectura diaria, aunque sea por 10 minutos, fortalece el vínculo emocional.
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
     <View style={styles.footer}>
  <TouchableOpacity onPress={() => router.push("/home")}>
    <Ionicons name="home-outline" size={24} color="#0057FF" />
    <Text style={styles.footerText}>Inicio</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/notificaciones")}>
    <Ionicons name="notifications-outline" size={24} color="#0057FF" />
    <Text style={styles.footerText}>Notificaciones</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/perfil")}>
    <Ionicons name="person-outline" size={24} color="#0057FF" />
    <Text style={styles.footerText}>Perfil</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/menu")}>
    <Ionicons name="menu-outline" size={24} color="#0057FF" />
    <Text style={styles.footerText}>Menú</Text>
  </TouchableOpacity>
</View>
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
  profileBox: { alignItems: "center" },
  profileName: { fontWeight: "bold", fontSize: 14, color: "#333" },
  profileAge: { fontSize: 12, color: "#666" },
  scrollContent: { padding: 15, paddingBottom: 100 },
  card: {
    backgroundColor: "#F2F7FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#0057FF" },
  cardSubtitle: { fontSize: 14, color: "#333", marginTop: 5 },
  reminder: { fontSize: 12, color: "#666", marginTop: 5 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#0057FF" },
  progress: { fontSize: 13, color: "#444", marginBottom: 10 },
  smallButton: {
    backgroundColor: "#0057FF",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  smallButtonText: { color: "#fff", fontSize: 12 },
  insightsCard: {
    backgroundColor: "#E6F0FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  insightItem: { fontSize: 13, color: "#333", marginTop: 5 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#F2F7FF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  gridText: { fontSize: 14, color: "#0057FF", marginTop: 5, fontWeight: "500" },
  cardHighlight: {
    backgroundColor: "#FFFBE6",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  recoText: { fontSize: 13, color: "#333" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: { fontSize: 12, color: "#0057FF", marginTop: 3, textAlign: "center" },
});
