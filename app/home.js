import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams();
  const [children, setChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChild, setActiveChild] = useState(null);
  const [loading, setLoading] = useState(true);

  const TOTAL_ACTIVITIES = 30; // puedes cambiarlo

  // cargar niños y niño activo
  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem("children");
        const savedIndex = await AsyncStorage.getItem("activeChildIndex");

        const list = json ? JSON.parse(json) : [];
        setChildren(list);

        const idx = savedIndex ? Number(savedIndex) : 0;
        setActiveIndex(idx);
        setActiveChild(list[idx] || null);
      } catch (error) {
        console.log("Error cargando home:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // para decidir si mostramos un área según lo que marcó en "enfoque"
  const hasFocus = (areaName) => {
    if (!activeChild) return true;
    const enfoque = activeChild.enfoque || [];
    if (enfoque.length === 0) return true;
    return enfoque.includes(areaName);
  };

  // texto por edad
  const getEdadTexto = () => {
    if (!activeChild || !activeChild.edad) return "su edad";
    if (activeChild.edad === "0-2") return "0-2 años";
    if (activeChild.edad === "3-5") return "3-5 años";
    if (activeChild.edad === "6-8") return "6-8 años";
    return activeChild.edad;
  };

  const nombreMostrado =
    (activeChild && activeChild.nombre) || nombre || "tu niño";

  // progreso del niño activo
  const completed = activeChild?.completedActivities || 0;
  const percent =
    completed >= TOTAL_ACTIVITIES
      ? 100
      : Math.round((completed / TOTAL_ACTIVITIES) * 100);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/icono-inicio.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.profileBox}>
          <Text style={styles.title}>Inicio</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/configuracion")}>
          <Ionicons name="settings-outline" size={26} color="#1c5e7aff" />
        </TouchableOpacity>
      </View>

      {/* SELECTOR DE NIÑOS */}
      {!loading && children.length > 0 && (
        <ScrollView
          horizontal
          style={{ paddingHorizontal: 23, marginTop: 15, marginBottom: 9 }}
          showsHorizontalScrollIndicator={false}
        >
          {children.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.childChip,
                i === activeIndex && styles.childChipActive,
              ]}
              onPress={async () => {
                setActiveIndex(i);
                setActiveChild(children[i]);
                await AsyncStorage.setItem("activeChildIndex", String(i));
              }}
            >
              <Text
                style={[
                  styles.childChipText,
                  i === activeIndex && { color: "#fff" },
                ]}
              >
                {c.nombre || `Niño ${i + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* SCROLL CENTRAL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Hola {nombreMostrado}!</Text>
          <Text style={styles.cardSubtitle}>
            Bienvenido a tu espacio digital saludable.
          </Text>
        </View>

        {/* Progreso */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Ionicons name="trending-up-outline" size={22} color="#51b3ddff" />
            <View>
              <Text style={styles.sectionTitle}>
                Progreso de {nombreMostrado}
              </Text>
              <Text style={styles.progressSubtitle}>
                Actividades completadas
              </Text>
            </View>
            <Text style={styles.progressNumber}>
              {completed}/{TOTAL_ACTIVITIES}
            </Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percent}%` }, // 👈 ahora sí cambia
              ]}
            />
          </View>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => router.push("/areas/sueno")}
          >
            <Text style={styles.smallButtonText}>
              ¡Comienza la primera actividad!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Insights según edad */}
        <View style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>
            Insights para {getEdadTexto()}
          </Text>
          <Text style={styles.insightItem}>
            🧠 Desarrollo Cognitivo: Aprende con juegos de memoria
          </Text>
          <Text style={styles.insightItem}>
            🎨 Habilidades Sociales: Interacciones con otros niños
          </Text>
          <Text style={styles.insightItem}>
            🏃 Desarrollo Motor: Juegos de coordinación
          </Text>
        </View>

        {/* Áreas filtradas */}
        <View style={styles.grid}>
          {hasFocus("Sueño") && (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/areas/sueno")}
            >
              <Ionicons name="moon-outline" size={24} color="#fff" />
              <Text style={styles.gridText}>Sueño</Text>
            </TouchableOpacity>
          )}

          {hasFocus("Social") && (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/areas/social")}
            >
              <Ionicons name="people-outline" size={24} color="#fff" />
              <Text style={styles.gridText}>Social</Text>
            </TouchableOpacity>
          )}

          {hasFocus("Alimentación") && (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/areas/alimentacion")}
            >
              <Ionicons name="fast-food-outline" size={24} color="#fff" />
              <Text style={styles.gridText}>Alimentación</Text>
            </TouchableOpacity>
          )}

          {hasFocus("Aprendizaje") && (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/areas/aprendizaje")}
            >
              <Ionicons name="book-outline" size={24} color="#fff" />
              <Text style={styles.gridText}>Aprendizaje</Text>
            </TouchableOpacity>
          )}

          {hasFocus("Motricidad") && (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => router.push("/areas/motricidad")}
            >
              <Ionicons name="walk-outline" size={24} color="#fff" />
              <Text style={styles.gridText}>Motricidad</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push("/areas/dispositivos")}
          >
            <Ionicons name="phone-portrait-outline" size={24} color="#fff" />
            <Text style={styles.gridText}>Dispositivos</Text>
          </TouchableOpacity>
        </View>

        {/* Recomendaciones */}
        <View style={styles.cardHighlight}>
          <Text style={styles.sectionTitle}>Recomendaciones Personalizadas</Text>
          <Text style={styles.recoText}>
            Para {nombreMostrado}: según su registro te mostramos estas áreas
            primero.
          </Text>
        </View>

        {/* Consejo experto */}
        <View style={styles.insightsCard}>
          <Text style={styles.sectionTitle}>Consejo Experto del Día</Text>
          <Text style={styles.insightItem}>
            📖 La lectura diaria, aunque sea por 10 minutos, fortalece el vínculo
            emocional.
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

        <TouchableOpacity onPress={() => router.push("/profile")}>
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
  container: { flex: 1, backgroundColor: "#bde4eeff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingEnd: 39,
    paddingBottom: -120,
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
  },
  profileBox: {
    alignItems: "center",
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
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
    color: "#1c5e7aff",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c5e7aff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    justifyContent: "center",
  },
  smallButton: {
    backgroundColor: "#51b3ddff",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  insightsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 6,
  },
  insightItem: {
    fontSize: 13,
    color: "#333",
    marginTop: 5,
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
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    fontWeight: "500",
  },
  cardHighlight: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 6,
  },
  recoText: {
    fontSize: 13,
    color: "#333",
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
    textAlign: "center",
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
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
    elevation: 3,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#51b3ddff",
    borderRadius: 10,
  },
  childChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },
  childChipActive: {
    backgroundColor: "#1c5e7aff",
    borderColor: "#1c5e7aff",
  },
  childChipText: {
    color: "#000",
  },
});
