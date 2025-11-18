// app/areas/alimentacion.js
import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Alimentacion() {
  const router = useRouter();

  const [children, setChildren] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChild, setActiveChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [savingActivity, setSavingActivity] = useState(false);
  const [water, setWater] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  // animación check (igual que en Sueño)
  const animScale = useRef(new Animated.Value(0.6)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  const TOTAL_ACTIVITIES = 30;
  const logoSource = require("../../assets/icono-inicio.png");

  // enlaces por dieta (los puedes mantener o quitar según quieras)
  const dietLinks = {
    Estándar:
      "https://www.youtube.com/results?search_query=recetas+saludables+para+ni%C3%B1os",
    Vegetariana:
      "https://www.youtube.com/results?search_query=recetas+vegetarianas+para+ni%C3%B1os",
    Vegana:
      "https://www.youtube.com/results?search_query=recetas+veganas+para+ni%C3%B1os",
    "Sin gluten":
      "https://www.youtube.com/results?search_query=recetas+sin+gluten+para+ni%C3%B1os",
    "Sin lácteos":
      "https://www.youtube.com/results?search_query=recetas+sin+l%C3%A1cteos+para+ni%C3%B1os",
  };

  // Carga inicial y al volver (igual que Sueño)
  const loadData = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("children");
      const savedIndex = await AsyncStorage.getItem("activeChildIndex");
      const list = json ? JSON.parse(json) : [];
      setChildren(list);

      const idx = savedIndex ? Number(savedIndex) : 0;
      setActiveIndex(idx);
      setActiveChild(list[idx] || null);

      // carga agua guardada para el niño seleccionado
      const w = await AsyncStorage.getItem(`water_${idx}`);
      setWater(w ? Number(w) : 0);
    } catch (err) {
      console.log("Error leyendo children en alimentación:", err);
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

  const toggleExpand = (section) => setExpanded((p) => (p === section ? null : section));

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert("No se puede abrir el enlace");
    } catch (err) {
      console.log("openLink error:", err);
      Alert.alert("Error", "No se pudo abrir el enlace");
    }
  };

  // Progreso & marcar sección como completada (mismo comportamiento que en Sueño)
  const isCompleted = (key) => !!activeChild?.sectionProgress?.[key];

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
    try {
      const updated = [...children];
      if (updated[activeIndex]) {
        updated[activeIndex].completedActivities = 0;
        updated[activeIndex].sectionProgress = {};
      }
      await AsyncStorage.setItem("children", JSON.stringify(updated));
      setChildren(updated);
      setActiveChild(updated[activeIndex] || null);
      Alert.alert("Reiniciado", "Progreso reiniciado (prueba)");
    } catch (err) {
      console.log("Error reset progreso:", err);
    }
  };

  // Agua
  const incrementWater = async () => {
    const newW = water + 1;
    setWater(newW);
    try {
      const key = `water_${activeIndex}`;
      await AsyncStorage.setItem(key, String(newW));
    } catch (err) {
      console.log("Error guardando agua:", err);
    }
  };

  const resetWater = async () => {
    setWater(0);
    try {
      const key = `water_${activeIndex}`;
      await AsyncStorage.setItem(key, "0");
    } catch (err) {
      console.log("Error reseteando agua:", err);
    }
  };

  // quiz
  const onSelectQuiz = (val) => setQuizAnswer(val);

  // text and progress values
  const dieta = activeChild?.dieta || "Estándar";
  const dietDescription = {
    Estándar:
      "Incluye frutas, vegetales, proteínas magras y pocos ultraprocesados.",
    Vegetariana:
      "Basada en plantas; puede incluir lácteos y huevo según la familia.",
    Vegana: "Solo alimentos de origen vegetal; cuidar proteínas y B12.",
    "Sin gluten":
      "Evita trigo, cebada y centeno. Usa arroz, maíz y avena sin gluten.",
    "Sin lácteos":
      "Evita leche y derivados. Usa bebidas vegetales y fuentes de calcio.",
  };

  const completed = activeChild?.completedActivities || 0;
  const percent = completed >= TOTAL_ACTIVITIES ? 100 : Math.round((completed / TOTAL_ACTIVITIES) * 100);
  const nombreMostrado = (activeChild && activeChild.nombre) || "tu niño";

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1c5e7aff" />
        </TouchableOpacity>

        <Image source={logoSource} style={styles.logo} />

        <Text style={styles.headerTitle}>Alimentación</Text>
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
                      const w = await AsyncStorage.getItem(`water_${i}`);
                      setWater(w ? Number(w) : 0);
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
          <Text style={styles.cardSubtitle}>Consejos y actividades para la alimentación.</Text>
        </View>

        {/* Progreso (resumen) - misma estructura que Sueño */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Ionicons name="trending-up-outline" size={18} color="#51b3ddff" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.sectionTitle}>Progreso de alimentación</Text>
              <Text style={styles.progressSubtitle}>
                {completed}/{TOTAL_ACTIVITIES} actividades completadas
              </Text>
            </View>
            <Text style={styles.progressPct}>{percent}%</Text>
          </View>

          <Text style={{ marginTop: 10, color: "#333" }}>
            Abre una sección y marca "Marcar como completada" para registrar progreso.
          </Text>

          <View style={{ marginTop: 10, alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.linkButtonSecondary} onPress={resetProgress}>
              <Text style={styles.linkButtonSecondaryText}>Reset (prueba)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plan actual */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Plan actual: {dieta}</Text>
          <Text style={styles.subItem}>
            {dietDescription[dieta] || "Selecciona una dieta al registrar al niño para personalizar esta sección."}
          </Text>
        </View>

        {/* Secciones expandibles */}
        {[
          { key: "ideas", icon: "restaurant-outline", title: "Ideas rápidas de hoy", items: dieta === "Vegetariana"
              ? ["Tortilla de espinaca y queso", "Arroz con verduras y fríjol", "Fruta picada con yogur"]
              : dieta === "Vegana"
              ? ["Avena con fruta y semillas", "Pasta con tomate y tofu", "Hummus con bastones de verdura"]
              : ["Arroz, pollo y ensalada", "Sopa de verduras", "Fruta de merienda"]
          },
          { key: "recetas", icon: "logo-youtube", title: "Ver recetas y videos", items: ["Videos cortos con ideas de meriendas y cenas."] },
          { key: "agua", icon: "water-outline", title: "Vasos de agua de hoy", items: [] },
          { key: "quiz", icon: "help-circle-outline", title: "Mini quiz", items: [] },
        ].map((sec) => (
          <View key={sec.key} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(sec.key)}>
              <View style={styles.cardIconText}>
                <Ionicons name={sec.icon} size={26} color="#1c5e7aff" />
                <Text style={styles.cardText}>{sec.title}</Text>
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
                {/* ideas / recetas / agua / quiz content */}
                {sec.key === "ideas" &&
                  sec.items.map((it, i) => <Text key={i} style={styles.subItem}>• {it}</Text>)
                }

                {sec.key === "recetas" && (
                  <>
                    <Text style={styles.subItem}>• {sec.items[0]}</Text>

                    {/* botones agrupados (igual que en Sueño) */}
                    <View style={styles.rowWrap}>
                      <TouchableOpacity style={styles.linkButton} onPress={() => openLink(dietLinks[dieta] || dietLinks["Estándar"])}>
                        <Ionicons name="play" size={14} color="#fff" />
                        <Text style={styles.linkButtonText}>Abrir recetas en YouTube</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.linkButtonSecondary} onPress={() => openLink("https://www.bbcgoodfood.com/search/recipes?q=kids")}>
                        <Ionicons name="restaurant-outline" size={14} color="#1c5e7aff" />
                        <Text style={styles.linkButtonSecondaryText}>Recetas</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.linkButtonSecondary} onPress={() => openLink("https://www.tasteofhome.com/collection/kid-friendly-recipes/")}>
                        <Ionicons name="fast-food-outline" size={14} color="#1c5e7aff" />
                        <Text style={styles.linkButtonSecondaryText}>Ideas rápidas</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {sec.key === "agua" && (
                  <>
                    <Text style={styles.subItem}>Cuenta con tu hijo los vasos que toma hoy.</Text>
                    <View style={styles.waterRow}>
                      <Text style={styles.waterNumber}>{water}</Text>

                      <TouchableOpacity style={styles.waterButton} onPress={incrementWater}>
                        <Text style={styles.waterButtonText}>+1 vaso</Text>
                      </TouchableOpacity>

                      {water > 0 && (
                        <TouchableOpacity style={[styles.waterButton, { backgroundColor: "#ddd" }]} onPress={resetWater}>
                          <Text style={[styles.waterButtonText, { color: "#000" }]}>Reiniciar</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                )}

                {sec.key === "quiz" && (
                  <>
                    <View style={styles.quizBox}>
                      <TouchableOpacity style={styles.quizOption} onPress={() => onSelectQuiz("mal")}>
                        <Text style={styles.quizOptionText}>🍬 Solo dulces y jugo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.quizOption} onPress={() => onSelectQuiz("bien")}>
                        <Text style={styles.quizOptionText}>🥪 Sánduche + fruta + agua</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.quizOption} onPress={() => onSelectQuiz("mal")}>
                        <Text style={styles.quizOptionText}>🧃 2 jugos industrializados</Text>
                      </TouchableOpacity>

                      {quizAnswer === "bien" && <Text style={styles.quizSuccess}>✅ ¡Muy bien! Proteína + carbohidrato + fruta.</Text>}
                      {quizAnswer === "mal" && <Text style={styles.quizError}>❌ Esa opción tiene demasiado azúcar. Intenta con fruta y agua.</Text>}
                    </View>
                  </>
                )}

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
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={{ height: 60 }} />
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
          <Text style={styles.animCheckText}>Actividad guardada</Text>
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
  logo: { width: 60, height: 60, marginLeft: 8, marginRight: 8 },

  content: { padding: 14, paddingBottom: 80 },

  card: {
    backgroundColor: "#bde4eec5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardIconText: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardText: { fontSize: 14, color: "#000" },

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

  // auxiliares (agua / quiz)
  rowWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  waterRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  waterNumber: { fontSize: 28, fontWeight: "bold", color: "#1c5e7aff" },
  waterButton: { backgroundColor: "#1c5e7aff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  waterButtonText: { color: "#fff", fontWeight: "700" },

  quizBox: { marginTop: 8 },
  quizOption: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 8 },
  quizOptionText: { color: "#000" },
  quizSuccess: { marginTop: 6, color: "#1c7c3f", fontWeight: "700" },
  quizError: { marginTop: 6, color: "#a33", fontWeight: "700" },
});
