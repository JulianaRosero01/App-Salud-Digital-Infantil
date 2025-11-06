import React from "react";
import {  View,  Text,  StyleSheet,  ScrollView,  TouchableOpacity,  Image,  Dimensions,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Welcome() {
     const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icono-inicio.png")}  style={styles.logo} />

      {/* Slogan */}
      <Text style={styles.subtitle}>
        Tu compañero inteligente para formar niños felices y saludables
      </Text>

      {/* Carrusel de banners */}
      <View style={styles.carouselWrapper}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          loop
        >
          <View style={styles.banner}>
            <Ionicons name="phone-portrait-outline" size={40} color="#2895b6ff" />
            <Text style={styles.bannerTitle}>Uso Responsable de dispositivos</Text>
            <Text style={styles.bannerText}>
              Guías expertas para un uso saludable y balanceado de pantallas y tecnología
            </Text>
          </View>

          <View style={styles.banner}>
            <Ionicons name="school-outline" size={40} color="#2895b6ff" />
            <Text style={styles.bannerTitle}>Desarrollo Personalizado</Text>
            <Text style={styles.bannerText}>
              Actividades adaptadas a la edad y etapa de tu hijo
            </Text>
          </View>

          <View style={styles.banner}>
            <Ionicons name="restaurant-outline" size={40} color="#2895b6ff" />
            <Text style={styles.bannerTitle}>Alimentación Inteligente</Text>
            <Text style={styles.bannerText}>
              Ideas y recomendaciones para una nutrición saludable
            </Text>
          </View>

          <View style={styles.banner}>
            <Ionicons name="fitness-outline" size={40} color="#2895b6ff" />
            <Text style={styles.bannerTitle}>Motricidad y Recreación</Text>
            <Text style={styles.bannerText}>
              Ejercicios y juegos para el desarrollo físico
            </Text>
          </View>
        </Swiper>
      </View>

      {/* Contenido por edades */}
      <Text style={styles.sectionTitle}>Contenido especializado por edades</Text>
      <Text style={styles.sectionSubtitle}>
        Cada etapa tiene sus propios desafíos y momentos mágicos
      </Text>

      {/* Edad 0-2 */}
      <View style={styles.ageCard}>
        <Text style={styles.ageTitle}>0-2 años • Primeros Pasos</Text>
        <Text style={styles.ageText}>
          Rutinas de sueño • Alimentación complementaria • Estimulación temprana • Tiempo boca abajo
        </Text>
      </View>

      {/* Edad 3-5 */}
      <View style={styles.ageCard}>
        <Text style={styles.ageTitle}>3-5 años • Exploradores</Text>
        <Text style={styles.ageText}>
          Habilidades sociales • Juego creativo • Límites saludables • Independencia gradual
        </Text>
      </View>

      {/* Edad 6-8 */}
      <View style={styles.ageCard}>
        <Text style={styles.ageTitle}>6-8 años • Pequeños Estudiantes</Text>
        <Text style={styles.ageText}>
          Hábitos de estudio • Gestión emocional • Actividades extracurriculares • Responsabilidad
        </Text>
      </View>


      {/* Ejemplo de consejos */}
      <Text style={styles.sectionTitle}>Ejemplo de Consejos Especializados</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoItem}>✔ Rutina de Sueño Saludable</Text>
        <Text style={styles.infoItem}>✔ Tiempo de Pantalla Equilibrado</Text>
        <Text style={styles.infoItem}>✔ Comunicación Efectiva</Text>
      </View>

      <TouchableOpacity style={styles.smallButton}>
        <Text style={styles.smallButtonText}>+100 consejos más disponibles</Text>
      </TouchableOpacity>

      {/* Card con gradiente */}
      <LinearGradient colors={["#51b3ddff", "#70aed8ff"]} style={styles.cardHighlight}>
        <Text style={styles.cardHighlightText}>¡Desbloquea Todo el Potencial!</Text>
        <Text style={styles.cardHighlightSub}>
          Para consejos personalizados, seguimiento de progreso y contenido específico para tu hijo,
          crea su perfil ahora.
        </Text>

        
        <TouchableOpacity    style={styles.primaryButton}   onPress={() => router.push("/profilesteps")} >
        <Text style={styles.primaryButtonText}>Crear Perfil de Mi Hijo</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Botón explorar sin registrar */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/exploracion")}>
        <Text style={styles.secondaryButtonText}>Explorar Primero Sin Registrar</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Respaldo por Especialistas: Consejos validados por pediatras, psicólogos infantiles y
        especialistas en desarrollo
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ade9f5ff",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#000000ff",
  },
  carouselWrapper: {
    height: 200,
    width: "100%",
    marginBottom: 25,
  },
  banner: {
    flex: 1,
    backgroundColor: "#ffffffff",
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#51b3ddff",
    elevation: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#51b3ddff",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  bannerText: {
    fontSize: 13,
    color: "#000000ff",
    textAlign: "center",
  },
  dot: {
    backgroundColor: "rgba(24, 153, 185, 0.37)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#2895b6ff",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#000000ff",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  ageCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "#51b3ddff",
    
    elevation: 15,
  },
  ageTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#51b3ddff",
  },
  ageText: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "#51b3ddff",
    
    elevation: 15,
  },
  infoItem: {
    fontSize: 13,
    color: "#000000ff",
    marginBottom: 5,
  },
  smallButton: {
    backgroundColor: "#51b3ddff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    
    elevation: 8,
  },
  smallButtonText: {
    color: "#ffffffff",
    fontSize: 12,
     fontWeight: "bold",
  },
  cardHighlight: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffffff",
    
    elevation: 15,
  },
  cardHighlightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  cardHighlightSub: {
    fontSize: 13,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#1c5e7aff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#51b3ddad",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  secondaryButtonText: {
    color: "#1c5e7aff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 11,
    color: "#51b3ddff",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 40,
    
    elevation: 15,
  },
  logo: {
    width: 200,   // ancho
    height: 200,  // alto
    resizeMode: 'contain', 
    
    elevation: 15,
  },
});
