import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Home() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams(); 

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        
         <Image source={require("../assets/icono-inicio.png")} style={styles.logo} resizeMode="contain"/>
        
        

          <Text style={styles.title}>Modo exploración</Text>
            <TouchableOpacity style={styles.smallButton} onPress={() => router.push("/profilesteps")}>
                <Text style={styles.smallButtonText}>Registrar</Text>
            </TouchableOpacity>
      </View>
      

      {/* SCROLL CENTRAL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Modo Exploración Activo</Text>
          <Text style={styles.cardSubtitle}>
            Estas viendo contenido de demostración. Los datos y progreso no se guardan.
          </Text>
        </View>

        {/* Progreso */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Ionicons name="trending-up-outline" size={22} color="#51b3ddff" />
            <View>
              <Text style={styles.sectionTitle}>Progreso de ejemplo</Text>
              <Text style={styles.progressSubtitle}>Actividades completadas</Text>
            </View>
            <Text style={styles.progressNumber}>0/30</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: "0%" }]} />
          </View>

          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Con el perfil registrado,el progreso se guarda automaticamente</Text>
          </TouchableOpacity>
        </View>

        {/* Insights */}
<View style={styles.insightsCard}>
  <Text style={styles.sectionTitle}>Insights según la edad de tu niño</Text>

  <View style={styles.insightItems}>
    <Ionicons name="bulb-outline" size={20} color="#1c5e7aff" />
    <Text style={styles.insightText}>Desarrollo Cognitivo</Text>
  </View>

  <View style={styles.insightItems}>
    <Ionicons name="heart-outline" size={20} color="#1c5e7aff" />
    <Text style={styles.insightText}>Habilidades Sociales</Text>
  </View>

  <View style={styles.insightItems}>
    <Ionicons name="walk-outline" size={20} color="#1c5e7aff" />
    <Text style={styles.insightText}>Desarrollo Motor</Text>
  </View>
</View>
        {/* Áreas prioritarias */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} >
            <Ionicons name="moon-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Sueño</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás recomendaciones y rutinas nocturnas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} >
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Social</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás recomendaciones sociales</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} >
            <Ionicons name="fast-food-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Alimentación</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás recomendaciones y buena alimentacion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} >
            <Ionicons name="book-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Aprendizaje</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás recomendaciones para un buen aprendizaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="walk-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Motricidad</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás juegos y ejercicios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Dispositivos</Text>
            <Text style={styles.gridTextsubtitle}>Aqui encontrarás recomendaciones para el uso de dispositivos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recomendaciones */}
        <View style={styles.cardHighlight}>
          <Text style={styles.sectionTitle}>Recomendaciones Personalizadas</Text>
          <Text style={styles.recoText}>
            Para Demo: Basado en sus gustos por musica, libros u otros, tenemos actividades especiales que le encantarán.
          </Text>
        </View>

         {/* Creciendo*/}
        <View style={styles.crecerCard}>
          <Text style={styles.sectionTitle}>Tu niño está creciendo increible</Text>
          <Text style={styles.insightItem}>
            12 actividades completadas juntos  Los logros reales se desbloquean con perfil registrado .
          </Text>
        </View>
         {/* Consejo experto */}
        <View style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Consejo Experto del Día</Text>
          <Text style={styles.insightItem}>
           Permitir que tu hijo tome decisiones simples (como elegir entre dos opciones de ropa) fomenta su autonomía y construye confianza duradera.
          </Text>
        </View>
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#bde4eeff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingEnd:39,
    paddingBottom:-120,
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
  },
  insightItems: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical:5,
  padding:1,
},

insightText: {
  marginLeft: 15,
  fontSize: 16,
  color: '#333',
},

  profileBox: { 
    alignItems: "center"
   },
  profileName: { 
    fontWeight: "bold", 
    fontSize: 14, 
    color: "#000"
   },
  scrollContent: {
     padding: 15, 
     paddingBottom: 100 
    },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 6,
  },
  cardTitle: {
     fontSize: 16,
      fontWeight: "bold",
       color: "#1c5e7aff"
       },
  cardSubtitle: {
     fontSize: 14,
      color: "#645656ff",
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
    color: "#1c5e7aff" 
  },
  title: { 
    fontSize: 18, 
  fontWeight: "bold", 
    color: "#000000ff", 
    justifyContent: "center",
  },
  smallButton: {
    backgroundColor: "#51b3ddc2",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  smallButtonText: { 
    color: "#ffffffff", 
    fontSize: 13, 
    fontWeight: "bold",  

  },
  insightsCard: { 
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 15 ,
    elevation:5,
},
  insightItem: { 
    fontSize: 13, 
    color: "#333", 
    marginTop: 5 
  },
  crecerCard:{
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 15 
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#51b3ddff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  gridText: { 
    fontSize: 15, 
    color: "#fff", 
    marginTop: 5, 
    fontWeight: "500" 
  },
  gridTextsubtitle:{
    color: "#ffffffff", 
    marginTop: 5, 
    fontSize: 12,
    paddingHorizontal:15,
  },
  cardHighlight: 
  { backgroundColor: "#fff",
     borderRadius: 12,
      padding: 15,
      marginBottom: 15 
    },
  recoText: { 
    fontSize: 13, 
    color: "#333" 
  },
  
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  progressSubtitle: { 
    fontSize: 12,
     color: "#666" 
    },
  progressNumber: { 
    fontSize: 13, 
    fontWeight: "bold", 
    color: "#1c5e7aff" 
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
    borderRadius: 10 },
});
