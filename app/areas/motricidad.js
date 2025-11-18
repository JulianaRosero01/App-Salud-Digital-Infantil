// app/areas/motricidad.js
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Easing,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

export default function Motricidad() {
  const router = useRouter();

  const [children, setChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChild, setActiveChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [savingActivity, setSavingActivity] = useState(false);

  // reproducir modal
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // animación check
  const animScale = useRef(new Animated.Value(0.6)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  const logoSource = require("../../assets/icono-inicio.png");
  const TOTAL_ACTIVITIES = 30;

  /**
   * Lista de videos en español (IDs reales)
   * - Deportes: 3 videos en español para actividades / ejercicios para niños
   * - Arte: 3 videos en español con manualidades / actividades creativas
   *
   * Si quieres que busque y reemplace por otros videos, dime los temas exactos
   * y los cambio.
   */
  const videoMap = {
    Deportes: [
      // ejercicios para niños (videos en español)
      { id: "mC-vnuz34tM", title: "Ejercicios para niños en casa - Actividad física" },
      { id: "B45jUWNnoQ4", title: "Rutina de ejercicios para niños - divertido y fácil" },
      { id: "BDZcc3iprs4", title: "Movimiento y coordinación para niños - juego activo" },
    ],
    Arte: [
      // manualidades / arte en español
      { id: "z3EBjpk9NBQ", title: "7 manualidades con papel muy fáciles" },
      { id: "8zPowOt0aho", title: "Ideas fáciles de manualidades para niños" },
      { id: "sO2rJDtcjk4", title: "Figuras de papel (origami) para niños" },
    ],
  };

  // carga children y niño activo
  const load = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("children");
      const arr = json ? JSON.parse(json) : [];
      setChildren(arr);

      const savedIndex = await AsyncStorage.getItem("activeChildIndex");
      const idx = savedIndex ? Number(savedIndex) : 0;
      setActiveIndex(idx);
      setActiveChild(arr[idx] || null);
    } catch (err) {
      console.log("Error leyendo children en motricidad:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const toggleExpand = (section) => setExpanded((p) => (p === section ? null : section));

  // abrir modal con webview usando la url corta de Youtube (embed)
  const openInAppPlayer = (videoId) => {
    if (!videoId) {
      Alert.alert("Video no disponible", "ID de video no encontrado.");
      return;
    }
    // usar la versión embed para reproducir dentro del WebView
    setPlayingVideoId(videoId);
    setModalVisible(true);
  };

  // marcar sección completada (mismo comportamiento que Sueño)
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

        // animación
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

  const completed = activeChild?.completedActivities || 0;
  const percent = completed >= TOTAL_ACTIVITIES ? 100 : Math.round((completed / TOTAL_ACTIVITIES) * 100);
  const nombreMostrado = (activeChild && activeChild.nombre) || "tu niño";

  const isCompleted = (key) => !!activeChild?.sectionProgress?.[key];

  // FILTRAR secciones según intereses del niño:
  // Si el niño tiene intereses y estos incluyen 'Deportes' o 'Arte' mostramos únicamente esas secciones.
  const intereses = activeChild?.intereses || [];
  const showOnly = intereses.length > 0 ? intereses.map(i => i.toLowerCase()) : null;

  const sectionsToRender = [
    { key: "deportes", icon: "football-outline", title: "Deportes", mapKey: "Deportes" },
    { key: "arte", icon: "color-palette-outline", title: "Arte", mapKey: "Arte" },
  ].filter(s => {
    if (!showOnly) return true; // no hay intereses: mostrar todo
    // si el niño puso 'deportes' ó 'arte' respetamos y mostramos solo los que hizo match
    return showOnly.some(si => s.title.toLowerCase().includes(si)) || (s.title.toLowerCase() === "deportes" && showOnly.includes("deportes")) || (s.title.toLowerCase() === "arte" && showOnly.includes("arte"));
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1c5e7aff" />
        </TouchableOpacity>

        <Image source={logoSource} style={styles.logo} />

        <Text style={styles.headerTitle}>Motricidad</Text>
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
                  <Text style={[styles.childPillText, i === activeIndex && { color: "#fff" }]}>{c.nombre || `Niño ${i + 1}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Saludo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Hola {nombreMostrado}!</Text>
          <Text style={styles.cardSubtitle}>Actividades motoras y creativas según su edad y gustos.</Text>
        </View>

        {/* Progreso (resumen) */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Ionicons name="trending-up-outline" size={18} color="#51b3ddff" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.sectionTitle}>Progreso motricidad</Text>
              <Text style={styles.progressSubtitle}>{completed}/{TOTAL_ACTIVITIES} actividades completadas</Text>
            </View>
            <Text style={styles.progressPct}>{percent}%</Text>
          </View>
          <Text style={{ marginTop: 10, color: "#333" }}>
            Abre una sección y marca "Marcar como completada" cuando termines la actividad.
          </Text>
          <View style={{ marginTop: 10, alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.linkButtonSecondary} onPress={resetProgress}>
              <Text style={styles.linkButtonSecondaryText}>Reset (prueba)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secciones (Deportes / Arte) */}
        {sectionsToRender.map((sec) => (
          <View key={sec.key} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(sec.key)}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name={sec.icon} size={26} color="#1c5e7aff" />
                <Text style={styles.cardTitleSmall}>{sec.title}</Text>
                {isCompleted(sec.key) && <Ionicons name="checkmark-circle" size={20} color="#1c7c3f" style={{ marginLeft: 8 }} />}
              </View>
              <Animated.View style={{ transform: [{ rotate: expanded === sec.key ? "180deg" : "0deg" }] }}>
                <Ionicons name="chevron-down" size={22} color="#1c5e7aff" />
              </Animated.View>
            </TouchableOpacity>

            {expanded === sec.key && (
              <View style={styles.subList}>
                <Text style={styles.subItem}>• Recomendaciones para {sec.title} (elige y reproduce los videos)</Text>

                <View style={styles.rowWrap}>
                  {(videoMap[sec.title] || []).map((v, i) => {
                    const thumb = v.id ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : null;
                    return (
                      <View key={i} style={{ marginRight: 12, marginBottom: 6 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => openInAppPlayer(v.id)}>
                          {thumb ? (
                            <Image source={{ uri: thumb }} style={styles.videoThumbLarge} />
                          ) : (
                            <View style={[styles.videoThumbLarge, { alignItems: "center", justifyContent: "center" }]}>
                              <Ionicons name="logo-youtube" size={36} color="#999" />
                            </View>
                          )}
                          <View style={styles.videoLabel}>
                            <Text numberOfLines={2} style={styles.videoLabelText}>{v.title}</Text>
                            <Text style={styles.videoHint}>Toca la imagen para reproducir</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>

                <View style={{ marginTop: 8, flexDirection: "row", gap: 8 }}>
                  {!isCompleted(sec.key) ? (
                    <TouchableOpacity style={[styles.smallButton, savingActivity && { opacity: 0.7 }]} onPress={() => completeSection(sec.key)} disabled={savingActivity}>
                      <Text style={styles.smallButtonText}>Marcar como completada</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={18} color="#fff" />
                      <Text style={styles.completedBadgeText}>Completada</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Modal player con WebView (reproduce YouTube embed) */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => { setModalVisible(false); setPlayingVideoId(null); }}>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <View style={styles.playerHeader}>
            <TouchableOpacity onPress={() => { setModalVisible(false); setPlayingVideoId(null); }}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.playerTitle}>Reproduciendo</Text>
            <View style={{ width: 28 }} />
          </View>

          {playingVideoId ? (
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${playingVideoId}?autoplay=1&controls=1` }}
              style={{ flex: 1 }}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          ) : (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff" }}>Video no disponible</Text>
            </View>
          )}
        </View>
      </Modal>

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
    paddingTop: 28,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c5e7aff",
    textAlign: "center",
    flex: 1,
  },
  logo: { width: 56, height: 56 },

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

  // thumbnails grandes
  rowWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  videoThumbLarge: {
    width: Math.min( (width - 60) / 2, 320),
    height: 140,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  videoLabel: { width: Math.min( (width - 60) / 2, 320), marginTop: 8 },
  videoLabelText: { fontSize: 13, fontWeight: "600" },
  videoHint: { fontSize: 12, color: "#666" },

  // modal player header
  playerHeader: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
