import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";



export default function Home() {
   const router = useRouter();
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="happy-outline" size={30} color="#1c5e7aff" />
        <View style={styles.profileBox}>
          <Text style={styles.profileName}>Juliana Rosero</Text>
          <Text style={styles.profileAge}>3-5 años</Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="#1c5e7aff" />
      </View>

      {/* SCROLL CENTRAL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Buenas tardes!</Text>
          <Text style={styles.cardSubtitle}>
            Es momento especial para Juliana Rosero
          </Text>
          <Text style={styles.reminder}>⏰ Recomendación a las 09:00</Text>
        </View>

        {/* Progreso */}
<View style={styles.card}>
  <View style={styles.progressHeader}>
    <Ionicons name="trending-up-outline" size={22} color="#51b3ddff" />
    <View>
      <Text style={styles.sectionTitle}>Progreso de Juliana Rosero</Text>
      <Text style={styles.progressSubtitle}>Actividades completadas</Text>
    </View>
    <Text style={styles.progressNumber}>0/30</Text>
  </View>

  {/* Barra de progreso */}
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBarFill, { width: "0%" }]} />
  </View>

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
          <Ionicons name="moon-outline" size={24} color="#ffffffff" />
          <Text style={styles.gridText}>Sueño</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/social")}
        >
          <Ionicons name="people-outline" size={24} color="#ffffffff" />
          <Text style={styles.gridText}>Social</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/alimentacion")}
        >
          <Ionicons name="fast-food-outline" size={24} color="#ffffffff" />
          <Text style={styles.gridText}>Alimentación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/aprendizaje")}
        >
          <Ionicons name="book-outline" size={24} color="#ffffffff" />
          <Text style={styles.gridText}>Aprendizaje</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/motricidad")}
        >
          <Ionicons name="walk-outline" size={24} color="#ffffffff" />
          <Text style={styles.gridText}>Motricidad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => router.push("/areas/dispositivos")}
        >
          <Ionicons name="phone-portrait-outline" size={24} color="#ffffffff" />
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
    <Ionicons name="home-outline" size={24} color="#1c5e7aff" />
    <Text style={styles.footerText}>Inicio</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/notificaciones")}>
    <Ionicons name="notifications-outline" size={24} color="#1c5e7aff" />
    <Text style={styles.footerText}>Notificaciones</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/perfil")}>
    <Ionicons name="person-outline" size={24} color="#1c5e7aff" />
    <Text style={styles.footerText}>Perfil</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => router.push("/menu")}>
    <Ionicons name="menu-outline" size={24} color="#1c5e7aff" />
    <Text style={styles.footerText}>Menú</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#bde4eeff"
   },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileBox: { alignItems: "center" },
  profileName: { fontWeight: "bold", fontSize: 14, color: "#000000ff" },
  profileAge: { fontSize: 12, color: "#5a5858ff" },
  scrollContent: { padding: 15, paddingBottom: 100 },
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: { 
    fontSize: 16,
    fontWeight: "bold", 
    color: "#1c5e7aff" },
  cardSubtitle: { 
    fontSize: 14, 
    color: "#000000ff", 
    marginTop: 5 
  },
  reminder: { 
    fontSize: 12,
     color: "#504d4dff", 
     marginTop: 5 
    },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#1c5e7aff" },
  progress: { 
    fontSize: 13, 
    color: "#504d4dff", 
    marginBottom: 10 },
  smallButton: {
    backgroundColor: "#51b3ddff",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  smallButtonText: { 
    color: "#fff", 
    fontSize: 13,
    fontWeight: "bold" 
  },
  insightsCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  insightItem: { 
    fontSize: 13, 
    color: "#333", 
    marginTop: 5 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margintop: 0,
    marginBottom: -70,
    
  
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#51b3ddff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffffff",
    //sombra 
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 6, // para Android

  
    
  },
  gridText: { 
    fontSize: 14, color: "#ffffffff", 
    marginTop: 5, 
    fontWeight: "500" 
  },
  cardHighlight: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  recoText: { 
    fontSize: 13, 
    color: "#333" 
  },
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
  footerText: {
     fontSize: 12, 
     color: "#1c5e7aff", 
     marginTop: 3, 
     textAlign: "center"
     },
     progressHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 15,
  marginLeft: 8,
  marginRight: 55,
},
progressSubtitle: {
  fontSize: 12,
  color: "#666",
},
progressNumber: {
  fontSize: 13,
  fontWeight: "bold",
  color: "#1c5e7aff",
},
progressBarContainer: {
  height: 8,
  backgroundColor: "#e1f1ff",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 12,
},
progressBarFill: {
  height: "100%",
  backgroundColor: "#51b3ddff",
  borderRadius: 10,
},

});
