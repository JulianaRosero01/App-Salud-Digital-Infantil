// app/areas/alimentacion.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Alimentacion() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(null);
  const [children, setChildren] = useState([]);
  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const [water, setWater] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem("children");
        if (json) {
          setChildren(JSON.parse(json));
        }
      } catch (err) {
        console.log("Error leyendo children en alimentación:", err);
      }
    };
    load();
  }, []);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const activeChild = children[activeChildIndex];
  const dieta = activeChild?.dieta || "Estándar";

  const dietLinks = {
    Estándar: "https://www.youtube.com/results?search_query=recetas+saludables+para+ni%C3%B1os",
    Vegetariana: "https://www.youtube.com/results?search_query=recetas+vegetarianas+para+ni%C3%B1os",
    Vegana: "https://www.youtube.com/results?search_query=recetas+veganas+para+ni%C3%B1os",
    "Sin gluten": "https://www.youtube.com/results?search_query=recetas+sin+gluten+para+ni%C3%B1os",
    "Sin lácteos": "https://www.youtube.com/results?search_query=recetas+sin+l%C3%A1cteos+para+ni%C3%B1os",
  };

  const dietDescription = {
    Estándar: "Incluye frutas, vegetales, proteínas magras y pocos ultraprocesados.",
    Vegetariana: "Basada en plantas, puede incluir lácteos y huevo según la familia.",
    Vegana: "Solo alimentos de origen vegetal, cuidar proteínas y B12.",
    "Sin gluten": "Evita trigo, cebada y centeno. Usa arroz, maíz, avena sin gluten.",
    "Sin lácteos": "Evita leche y derivados. Usa bebidas vegetales y fuentes de calcio.",
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1c5e7aff" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/icono-inicio.png")}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Alimentación</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {children.length > 1 && (
          <View style={styles.childSelector}>
            <Text style={styles.selectorLabel}>Ver alimentación de:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {children.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.childPill,
                    i === activeChildIndex && styles.childPillActive,
                  ]}
                  onPress={() => {
                    setActiveChildIndex(i);
                    setExpanded(null);
                  }}
                >
                  <Text
                    style={[
                      styles.childPillText,
                      i === activeChildIndex && { color: "#fff" },
                    ]}
                  >
                    {c.nombre || `Niño ${i + 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Plan actual: {dieta || "no definido"}
          </Text>
          <Text style={styles.text}>
            {dietDescription[dieta] ||
              "Selecciona una dieta al registrar al niño para personalizar esta sección."}
          </Text>
        </View>

        {/* CARD 1: ideas */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand("ideas")}
          >
            <View style={styles.cardIconText}>
              <Ionicons name="restaurant-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Ideas rápidas de hoy</Text>
            </View>
            <Ionicons
              name={expanded === "ideas" ? "chevron-up" : "chevron-down"}
              size={22}
              color="#1c5e7aff"
            />
          </TouchableOpacity>
          {expanded === "ideas" && (
            <View style={styles.subList}>
              {dieta === "Vegetariana" && (
                <>
                  <Text style={styles.subItem}>• Tortilla de espinaca y queso</Text>
                  <Text style={styles.subItem}>• Arroz con verduras y fríjol</Text>
                  <Text style={styles.subItem}>• Fruta picada con yogur</Text>
                </>
              )}
              {dieta === "Vegana" && (
                <>
                  <Text style={styles.subItem}>• Avena con fruta y semillas</Text>
                  <Text style={styles.subItem}>• Pasta con salsa de tomate y tofu</Text>
                  <Text style={styles.subItem}>• Hummus con bastones de zanahoria</Text>
                </>
              )}
              {dieta === "Sin gluten" && (
                <>
                  <Text style={styles.subItem}>• Arepa con huevo y aguacate</Text>
                  <Text style={styles.subItem}>• Arroz con pollo y verduras</Text>
                  <Text style={styles.subItem}>• Fruta y yogur natural</Text>
                </>
              )}
              {dieta === "Sin lácteos" && (
                <>
                  <Text style={styles.subItem}>• Avena en leche vegetal</Text>
                  <Text style={styles.subItem}>• Pollo al horno con papas</Text>
                  <Text style={styles.subItem}>• Fruta con mantequilla de maní</Text>
                </>
              )}
              {(!dieta || dieta === "Estándar") && (
                <>
                  <Text style={styles.subItem}>• Arroz, pollo y ensalada</Text>
                  <Text style={styles.subItem}>• Sopa de verduras</Text>
                  <Text style={styles.subItem}>• Fruta de merienda</Text>
                </>
              )}
            </View>
          )}
        </View>

        {/* CARD 2: recetas youtube */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand("recetas")}
          >
            <View style={styles.cardIconText}>
              <Ionicons name="logo-youtube" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Ver recetas para esta dieta</Text>
            </View>
            <Ionicons
              name={expanded === "recetas" ? "chevron-up" : "chevron-down"}
              size={22}
              color="#1c5e7aff"
            />
          </TouchableOpacity>
          {expanded === "recetas" && (
            <View style={styles.subList}>
              <Text style={styles.subItem}>
                • Videos cortos con ideas de loncheras, meriendas y cenas.
              </Text>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  openLink(
                    dietLinks[dieta] ||
                      "https://www.youtube.com/results?search_query=recetas+saludables+para+ni%C3%B1os"
                  )
                }
              >
                <Ionicons name="play" size={16} color="#fff" />
                <Text style={styles.linkButtonText}>Abrir en YouTube</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* CARD 3: agua */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconText}>
              <Ionicons name="water-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Vasos de agua de hoy</Text>
            </View>
          </View>
          <Text style={{ marginTop: 6, color: "#000" }}>
            Lleva el conteo con tu hijo, así entiende su propio cuidado 💧
          </Text>
          <View style={styles.waterRow}>
            <Text style={styles.waterNumber}>{water}</Text>
            <TouchableOpacity
              style={styles.waterButton}
              onPress={() => setWater((w) => w + 1)}
            >
              <Text style={styles.waterButtonText}>+1 vaso</Text>
            </TouchableOpacity>
            {water > 0 && (
              <TouchableOpacity
                style={[styles.waterButton, { backgroundColor: "#ddd" }]}
                onPress={() => setWater(0)}
              >
                <Text style={[styles.waterButtonText, { color: "#000" }]}>
                  Reiniciar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* CARD 4: quiz */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconText}>
              <Ionicons name="help-circle-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Mini quiz: lonchera saludable</Text>
            </View>
          </View>
          <View style={styles.quizBox}>
            <TouchableOpacity
              style={styles.quizOption}
              onPress={() => setQuizAnswer("mal")}
            >
              <Text style={styles.quizOptionText}>🍬 Solo dulces y jugo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quizOption}
              onPress={() => setQuizAnswer("bien")}
            >
              <Text style={styles.quizOptionText}>
                🥪 Sánduche + fruta + agua
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quizOption}
              onPress={() => setQuizAnswer("mal")}
            >
              <Text style={styles.quizOptionText}>
                🧃 2 jugos industrializados
              </Text>
            </TouchableOpacity>

            {quizAnswer === "bien" && (
              <Text style={styles.quizSuccess}>
                ✅ ¡Muy bien! Combinas proteína, carbohidrato y fruta.
              </Text>
            )}
            {quizAnswer === "mal" && (
              <Text style={styles.quizError}>
                ❌ Esa opción tiene demasiado azúcar. Intenta con fruta y agua.
              </Text>
            )}
          </View>
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
    paddingTop: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c5e7aff",
    marginRight: 150,
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
    marginLeft: -70,
  },
  content: {
    padding: 15,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: "#e5f4f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1c5e7aff",
  },
  text: {
    fontSize: 14,
    color: "#000",
  },
  card: {
    backgroundColor: "#bde4eec5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardIconText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
    flexShrink: 1,
  },
  subList: {
    marginTop: 8,
    marginLeft: 38,
    gap: 6,
  },
  subItem: {
    fontSize: 13,
    color: "#000",
  },
  linkButton: {
    marginTop: 10,
    backgroundColor: "#1c5e7aff",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  linkButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  childSelector: {
    marginBottom: 10,
  },
  selectorLabel: {
    fontSize: 13,
    marginBottom: 4,
    color: "#000",
  },
  childPill: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#1c5e7aff",
  },
  childPillActive: {
    backgroundColor: "#1c5e7aff",
  },
  childPillText: {
    color: "#1c5e7aff",
    fontWeight: "500",
  },
  waterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  waterNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c5e7aff",
  },
  waterButton: {
    backgroundColor: "#1c5e7aff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  waterButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  quizBox: {
    marginTop: 10,
    gap: 6,
  },
  quizOption: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  quizOptionText: {
    color: "#000",
  },
  quizSuccess: {
    marginTop: 6,
    color: "#1c7c3f",
    fontWeight: "600",
  },
  quizError: {
    marginTop: 6,
    color: "#a33",
    fontWeight: "600",
  },
});
