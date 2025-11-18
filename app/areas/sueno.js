import React, { useEffect, useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native"; // 👈 agrega esto

export default function Home() {
  const router = useRouter();
  const { nombre } = useLocalSearchParams();
  const [children, setChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChild, setActiveChild] = useState(null);
  const [loading, setLoading] = useState(true);

  const TOTAL_ACTIVITIES = 30;

  // la función que carga todo
  const loadData = async () => {
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

  // 1) al montar
  useEffect(() => {
    loadData();
  }, []);

  // 2) cada vez que vuelves a Home
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const hasFocus = (areaName) => {
    if (!activeChild) return true;
    const enfoque = activeChild.enfoque || [];
    if (enfoque.length === 0) return true;
    return enfoque.includes(areaName);
  };

  const getEdadTexto = () => {
    if (!activeChild || !activeChild.edad) return "su edad";
    if (activeChild.edad === "0-2") return "0-2 años";
    if (activeChild.edad === "3-5") return "3-5 años";
    if (activeChild.edad === "6-8") return "6-8 años";
    return activeChild.edad;
  };

  const nombreMostrado =
    (activeChild && activeChild.nombre) || nombre || "tu niño";

  // ⬇️ progreso
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
          source={require("../../assets/icono-inicio.png")}
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
                { width: `${percent}%` },
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

        {/* ... el resto de tu home igual ... */}
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
  // los mismos estilos que ya tenías...
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
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
  },
  profileBox: { alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", color: "#000000ff" },
  scrollContent: { padding: 15, paddingBottom: 100 },
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
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1c5e7aff" },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  progressSubtitle: { fontSize: 12, color: "#666" },
  progressNumber: { fontSize: 13, fontWeight: "bold", color: "#1c5e7aff" },
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
  smallButton: {
    backgroundColor: "#51b3ddff",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  smallButtonText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
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
  childChipText: { color: "#000" },
});
