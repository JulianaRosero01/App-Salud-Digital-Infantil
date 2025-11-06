import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Sueno() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1c5e7aff" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/icono-inicio.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Sueño</Text>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Rutinas de descanso reparador</Text>
        <Text style={styles.text}>
          Aquí encontrarás consejos y actividades para mejorar los hábitos de sueño de tu hijo.
        </Text>

        {/* --- Card 1 --- */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand("rutina")}
          >
            <View style={styles.cardIconText}>
              <Ionicons name="bed-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Establece una rutina nocturna consistente</Text>
            </View>
            <Ionicons
              name={expanded === "rutina" ? "chevron-up" : "chevron-down"}
              size={22}
              color="#1c5e7aff"
            />
          </TouchableOpacity>

          {expanded === "rutina" && (
            <View style={styles.subList}>
              <Text style={styles.subItem}>• Cepillarse los dientes antes de dormir</Text>
              <Text style={styles.subItem}>• Tomar un baño tibio</Text>
              <Text style={styles.subItem}>• Poner pijama y preparar la cama</Text>
              <Text style={styles.subItem}>• Apagar luces y sonidos fuertes</Text>
            </View>
          )}
        </View>

        {/* --- Card 2 --- */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand("cuento")}
          >
            <View style={styles.cardIconText}>
              <Ionicons name="book-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Leer un cuento antes de dormir ayuda a relajarse</Text>
            </View>
            <Ionicons
              name={expanded === "cuento" ? "chevron-up" : "chevron-down"}
              size={22}
              color="#1c5e7aff"
            />
          </TouchableOpacity>

          {expanded === "cuento" && (
            <View style={styles.subList}>
              <Text style={styles.subItem}>• Escoge historias cortas y tranquilas</Text>
              <Text style={styles.subItem}>• Usa una voz suave y pausada</Text>
              <Text style={styles.subItem}>• Permite que el niño elija el libro</Text>
              <Text style={styles.subItem}>• Acompaña el cuento con un abrazo</Text>
            </View>
          )}
        </View>

        {/* --- Card 3 --- */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() => toggleExpand("pantallas")}
          >
            <View style={styles.cardIconText}>
              <Ionicons name="moon-outline" size={28} color="#1c5e7aff" />
              <Text style={styles.cardText}>Evita pantallas al menos 1 hora antes de dormir</Text>
            </View>
            <Ionicons
              name={expanded === "pantallas" ? "chevron-up" : "chevron-down"}
              size={22}
              color="#1c5e7aff"
            />
          </TouchableOpacity>

          {expanded === "pantallas" && (
            <View style={styles.subList}>
              <Text style={styles.subItem}>• Apaga el televisor y tablet antes de dormir</Text>
              <Text style={styles.subItem}>• Reemplaza el tiempo de pantalla con lectura</Text>
              <Text style={styles.subItem}>• Crea un ambiente tranquilo sin estímulos</Text>
              <Text style={styles.subItem}>• Guarda los dispositivos fuera del cuarto</Text>
            </View>
          )}
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
    paddingBottom: -45,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1c5e7aff",
    justifyContent: "center",
    marginRight: 150,
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1c5e7aff",
  },
  text: {
    fontSize: 14,
    color: "#000000ff",
    marginBottom: 15,
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
    color: "#000000ff",
    marginLeft: 10,
    flexShrink: 1,
  },
  subList: {
    marginTop: 8,
    marginLeft: 38,
  },
  subItem: {
    fontSize: 13,
    color: "#000000ff",
    marginVertical: 2,
  },
  logo: {
    width: 70,
    height: 80,
    resizeMode: "contain",
    marginLeft: -70,
  },
});
