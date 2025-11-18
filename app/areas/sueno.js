// app/areas/sueno.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Sueno() { 
  const router = useRouter();
  const { nombre } = useLocalSearchParams();

  const [children, setChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChild, setActiveChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [savingActivity, setSavingActivity] = useState(false);

  // animación check (flotante)
  const animScale = useRef(new Animated.Value(0.6)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  const TOTAL_ACTIVITIES = 30;
  const logoSource = require("../../assets/icono-inicio.png");

  const loadData = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("children");
      const savedIndex = await AsyncStorage.getItem("activeChildIndex");
      const list = json ? JSON.parse(json) : [];
      setChildren(list);

      const idx = savedIndex ? Number(savedIndex) : 0;
      setActiveIndex(idx);
      setActiveChild(list[idx] || null);
    } catch (error) {
      console.log("Error cargando sueno:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const toggleExpand = (section) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("No se puede abrir el enlace");
      }
    } catch (err) {
      console.log("openLink error:", err);
    }
  };

  // marca una SECCION como completada (y actualiza completedActivities solo una vez por sección)
  const completeSection = async (sectionKey) => {
    if (!activeChild || savingActivity) return;
    setSavingActivity(true);
    try {
      const updated = [...children];
      const idx = activeIndex;
      const child = { ...(updated[idx] || activeChild) };

      if (!child.sectionProgress) child.sectionProgress = {};
      const already = !!child.sectionProgress[sectionKey];

      if (!already) {
        child.sectionProgress[sectionKey] = true;
        child.completedActivities = (child.completedActivities || 0) + 1;
        if (child.completedActivities > TOTAL_ACTIVITIES) child.completedActivities = TOTAL_ACTIVITIES;

        updated[idx] = child;
        await AsyncStorage.setItem("children", JSON.stringify(updated));
        setChildren(updated);
        setActiveChild(child);

        // animación check flotante
        animOpacity.setValue(0);
        animScale.setValue(0.6);
        Animated.parallel([
          Animated.timing(animOpacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(animScale, {
              toValue: 1.25,
              duration: 220,
              easing: Easing.out(Easing.back(2)),
              useNativeDriver: true,
            }),
            Animated.timing(animScale, {
              toValue: 1,
              duration: 120,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          setTimeout(() => {
            Animated.timing(animOpacity, {
              toValue: 0,
              duration: 450,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }).start(() => {
              setSavingActivity(false);
            });
          }, 700);
        });
      } else {
        Alert.alert("Ya completada", "Esta actividad ya fue marcada como completada.");
        setSavingActivity(false);
      }
    } catch (err) {
      console.log("Error completando sección:", err);
      Alert.alert("Error", "No se pudo guardar la actividad");
      setSavingActivity(false);
    }
  };

  const resetProgress = async () => {
    if (!activeChild) return;
    try {
      const updated = [...children];
      updated[activeIndex] = { ...(updated[activeIndex] || activeChild), completedActivities: 0, sectionProgress: {} };
      await AsyncStorage.setItem("children", JSON.stringify(updated));
      setChildren(updated);
      setActiveChild(updated[activeIndex]);
    } catch (err) {
      console.log("Error reseteando:", err);
    }
  };

  const ageRecommendations = (edad) => {
    if (!edad) {
      return {
        title: "Recomendaciones generales",
        items: [
          "Rutinas consistentes (hora de dormir similar cada día).",
          "Cuentos y música suave antes de dormir.",
          "Evitar comidas pesadas justo antes de la hora de dormir.",
        ],
      };
    }
    if (edad === "0-2") {
      return {
        title: "0-2 años - recomendaciones",
        items: [
          "Siestas cortas y regulares durante el día.",
          "Rutina: baño, pijama, cuento y apagado de luces.",
          "Evita líquidos azucarados antes de dormir.",
        ],
      };
    }
    if (edad === "3-5") {
      return {
        title: "3-5 años - recomendaciones",
        items: [
          "Hora fija para acostarse y levantarse.",
          "Lectura breve y canción suave para despedida.",
          "Limita estímulos 30–45 minutos antes (luz, juego intenso).",
        ],
      };
    }
    if (edad === "6-8") {
      return {
        title: "6-8 años - recomendaciones",
        items: [
          "Fomenta responsabilidad por la rutina (cepillado, ropa preparada).",
          "Actividad física durante el día para cansancio natural.",
          "Conversación tranquila sobre el día ayuda a relajarse.",
        ],
      };
    }
    return {
      title: "Recomendaciones según edad",
      items: ["Rutina establecida cada noche.", "Lectura o música suave antes de dormir."],
    };
  };

  const completed = activeChild?.completedActivities || 0;
  const percent = completed >= TOTAL_ACTIVITIES ? 100 : Math.round((completed / TOTAL_ACTIVITIES) * 100);
  const nombreMostrado = (activeChild && activeChild.nombre) || nombre || "tu niño";
  const recs = ageRecommendations(activeChild?.edad);

  const isCompleted = (key) => !!activeChild?.sectionProgress?.[key];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1c5e7aff" />
        </TouchableOpacity>

        <Image source={logoSource} style={styles.logo} resizeMode="contain" />

        <Text style={styles.headerTitle}>Sueño</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Selector de niños */}
        {!loading && children.length > 0 && (
          <View style={styles.childSelector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {children.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.childPill, i === activeIndex && styles.childPillActive]}
                  onPress={async () => {
                    setActiveIndex(i);
                    setExpanded(null);
                    try {
                      await AsyncStorage.setItem("activeChildIndex", String(i));
                      const json = await AsyncStorage.getItem("children");
                      const arr = json ? JSON.parse(json) : [];
                      setChildren(arr);
                      setActiveChild(arr[i] || null);
                    } catch (err) {
                      console.log("Error cambiando niño:", err);
                    }
                  }}
                >
                  <Text style={[styles.childPillText, i === activeIndex && { color: "#fff" }]}>
                    {c.nombre || `Niño ${i + 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Hola {nombreMostrado}!</Text>
          <Text style={styles.cardSubtitle}>Consejos y recursos para mejorar el sueño.</Text>
        </View>

        {/* Progreso (resumen) - OJO: sin botón general */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Ionicons name="trending-up-outline" size={18} color="#51b3ddff" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.sectionTitle}>Progreso de sueño</Text>
              <Text style={styles.progressSubtitle}>
                {completed}/{TOTAL_ACTIVITIES} actividades completadas
              </Text>
            </View>
            <Text style={styles.progressPct}>{percent}%</Text>
          </View>

          {/* Removed the top "Actividad completada" button here intentionally */}
          <Text style={{ marginTop: 10, color: "#333" }}>
            Completa actividades desde cada sección (abre una sección y marca "Marcar como completada").
          </Text>

          <View style={{ marginTop: 10, alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.linkButtonSecondary} onPress={resetProgress}>
              <Text style={styles.linkButtonSecondaryText}>Reset (prueba)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recomendaciones por edad */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{recs.title}</Text>
          {recs.items.map((it, idx) => (
            <Text key={idx} style={styles.subItem}>• {it}</Text>
          ))}

          <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
            <TouchableOpacity style={styles.linkButton} onPress={() => openLink("https://www.youtube.com/results?search_query=cuentos+para+dormir+niños")}>
              <Ionicons name="logo-youtube" size={16} color="#fff" />
              <Text style={styles.linkButtonText}>Cuentos en YouTube</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButtonSecondary} onPress={() => openLink("https://www.youtube.com/results?search_query=música+para+dormir+niños")}>
              <Ionicons name="musical-notes-outline" size={16} color="#1c5e7aff" />
              <Text style={styles.linkButtonSecondaryText}>Música para dormir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secciones expandibles: cada una muestra botón dentro */}
        {[
          { key: "rutina", icon: "bed-outline", title: "Rutina nocturna", items: ["Cepillarse los dientes antes de dormir", "Baño tibio + pijama", "Luz tenue y lectura corta"] },
          { key: "cuento", icon: "book-outline", title: "Cuentos y audiocuentos", items: ["Escoge historias cortas y tranquilas", "Usa voz suave y pausada", "Permite que el niño elija el libro"] },
          { key: "musica", icon: "musical-notes-outline", title: "Música relajante", items: ["Sonidos suaves: lluvia, olas, nanas", "Volumen bajo y alejar el dispositivo"] },
          { key: "consejos", icon: "information-circle-outline", title: "Consejos rápidos", items: ["Mantén horarios consistentes", "Evita comidas pesadas justo antes", "Usa una canción de 2 min para el cepillado"] },
        ].map((sec) => (
          <View key={sec.key} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(sec.key)}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name={sec.icon} size={26} color="#1c5e7aff" />
                <Text style={styles.cardTitleSmall}>{sec.title}</Text>
                {isCompleted(sec.key) && (
                  <Ionicons name="checkmark-circle" size={20} color="#1c7c3f" style={{ marginLeft: 8 }} />
                )}
              </View>
              <Animated.View style={{ transform: [{ rotate: expanded === sec.key ? "180deg" : "0deg" }] }}>
                <Ionicons name="chevron-down" size={22} color="#1c5e7aff" />
              </Animated.View>
            </TouchableOpacity>

            {expanded === sec.key && (
              <View style={styles.subList}>
                {sec.items.map((it, i) => (
                  <Text key={i} style={styles.subItem}>• {it}</Text>
                ))}

                <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
                  {!isCompleted(sec.key) ? (
                    <TouchableOpacity
                      style={[styles.smallButton, savingActivity && { opacity: 0.7 }]}
                      onPress={() => completeSection(sec.key)}
                      disabled={savingActivity}
                    >
                      <Text style={styles.smallButtonText}>Marcar como completada</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={18} color="#fff" />
                      <Text style={styles.completedBadgeText}>Completada</Text>
                    </View>
                  )}

                  {sec.key === "cuento" && (
                    <TouchableOpacity style={styles.linkButtonSecondary} onPress={() => openLink("https://www.freechildrenstories.com/")}>
                      <Ionicons name="book-outline" size={16} color="#1c5e7aff" />
                      <Text style={styles.linkButtonSecondaryText}>Ver cuentos</Text>
                    </TouchableOpacity>
                  )}

                  {sec.key === "musica" && (
                    <TouchableOpacity style={[styles.linkButton, { backgroundColor: "#1c5e7aff" }]} onPress={() => openLink("https://www.youtube.com/results?search_query=música+para+dormir+niños")}>
                      <Ionicons name="logo-youtube" size={16} color="#fff" />
                      <Text style={styles.linkButtonText}>Música</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ANIMACIÓN CHECK flotante */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.animCheckWrap,
          {
            opacity: animOpacity,
            transform: [{ scale: animScale }],
          },
        ]}
      >
        <View style={styles.animCheck}>
          <Ionicons name="checkmark" size={34} color="#fff" />
          <Text style={styles.animCheckText}>Actividad completada</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 30,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c5e7aff",
    textAlign: "center",
    flex: 1,
  },
  logo: { width: 60, height: 60, marginLeft: 8, marginRight: 8 },

  content: { padding: 15 },
  card: {
    backgroundColor: "#bde4eec5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardHeaderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardTitleSmall: { fontSize: 16, fontWeight: "700", marginLeft: 6, color: "#1c5e7aff" },

  cardTitle: { fontSize: 16, fontWeight: "700", color: "#1c5e7aff" },
  cardSubtitle: { fontSize: 13, color: "#333", marginTop: 6 },

  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#1c5e7aff" },
  progressHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progressSubtitle: { fontSize: 12, color: "#333" },
  progressPct: { fontSize: 13, fontWeight: "700", color: "#1c5e7aff" },

  subList: { marginTop: 8, marginLeft: 8 },
  subItem: { fontSize: 13, color: "#000", marginVertical: 2 },

  smallButton: {
    backgroundColor: "#51b3ddff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    flex: 1,
  },
  smallButtonText: { color: "#fff", fontWeight: "700" },

  linkButton: {
    marginTop: 12,
    backgroundColor: "#d62828",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  linkButtonText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  linkButtonSecondary: {
    marginTop: 6,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d6e6ef",
    alignSelf: "flex-start",
  },
  linkButtonSecondaryText: { color: "#1c5e7aff", fontWeight: "600", marginLeft: 6 },

  textSmall: { fontSize: 13, color: "#333", marginTop: 8 },

  // selector niños
  childSelector: { marginBottom: 12 },
  childPill: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#1c5e7aff",
  },
  childPillActive: { backgroundColor: "#1c5e7aff" },
  childPillText: { color: "#1c5e7aff", fontWeight: "600" },

  // anim check
  animCheckWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  animCheck: {
    backgroundColor: "#1c7c3f",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    flexDirection: "row",
    gap: 8,
  },
  animCheckText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  completedBadge: {
    backgroundColor: "#1c7c3f",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  completedBadgeText: { color: "#fff", fontWeight: "700", marginLeft: 6 },
});
