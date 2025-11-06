// app/areas/editar-perfil.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function EditarPerfil() {
  const router = useRouter();
  const { index } = useLocalSearchParams(); // 👈 aquí viene el índice
  const childIndex = Number(index);
  const [child, setChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 👇 función para registrar notificaciones dentro de la app
  const addNotification = async (message) => {
    try {
      const existing = await AsyncStorage.getItem("notifications");
      let list = existing ? JSON.parse(existing) : [];
      list.unshift({
        message,
        date: new Date().toISOString(),
      });
      await AsyncStorage.setItem("notifications", JSON.stringify(list));
    } catch (err) {
      console.log("Error guardando notificación:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const json = await AsyncStorage.getItem("children");
          if (json) {
            const arr = JSON.parse(json);
            setChildren(arr);
            if (arr[childIndex]) {
              setChild({
                nombre: arr[childIndex].nombre || "",
                edad: arr[childIndex].edad || "",
                genero: arr[childIndex].genero || "",
                dieta: arr[childIndex].dieta || "",
                intereses: arr[childIndex].intereses || [],
                enfoque: arr[childIndex].enfoque || [],
              });
            } else {
              setChild({
                nombre: "",
                edad: "",
                genero: "",
                dieta: "",
                intereses: [],
                enfoque: [],
              });
            }
          }
        } catch (error) {
          console.log("Error leyendo children:", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, [childIndex])
  );

  const handleSave = async () => {
    if (!child) return;
    setSaving(true);
    try {
      const updated = [...children];
      updated[childIndex] = child; // reemplazo solo el niño que edité
      await AsyncStorage.setItem("children", JSON.stringify(updated));

      // 👇 aquí registramos la notificación
      await addNotification(
        `Se actualizó el perfil de ${child.nombre || "tu niño"}`
      );

      Alert.alert("Guardado", "Los datos del niño se actualizaron.");
      router.back();
    } catch (error) {
      console.log("Error guardando:", error);
      Alert.alert("Error", "No se pudieron guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeArray = (field, text) => {
    const arr = text
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    setChild({ ...child, [field]: arr });
  };

  if (loading || !child) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1c5e7aff" />
        </TouchableOpacity>

        <Image
          source={require("../assets/icono-inicio.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Editar perfil</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre del niño</Text>
        <TextInput
          style={styles.input}
          value={child.nombre}
          onChangeText={(text) => setChild({ ...child, nombre: text })}
          placeholder="Ej: Carmen"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Edad (rango)</Text>
        <View style={styles.rowButtons}>
          {["0-2", "3-5", "6-8"].map((rango) => (
            <TouchableOpacity
              key={rango}
              style={[
                styles.chip,
                child.edad === rango && styles.chipActive,
              ]}
              onPress={() => setChild({ ...child, edad: rango })}
            >
              <Text
                style={[
                  styles.chipText,
                  child.edad === rango && styles.chipTextActive,
                ]}
              >
                {rango} años
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Género</Text>
        <View style={styles.rowButtons}>
          {["niño", "niña", "prefiero no decir"].map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.chip,
                child.genero === g && styles.chipActive,
              ]}
              onPress={() => setChild({ ...child, genero: g })}
            >
              <Text
                style={[
                  styles.chipText,
                  child.genero === g && styles.chipTextActive,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Dieta</Text>
        <View style={styles.rowButtons}>
          {["Estándar", "Vegetariana", "Vegana", "Sin gluten", "Sin lácteos"].map(
            (d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.chipSmall,
                  child.dieta === d && styles.chipActive,
                ]}
                onPress={() => setChild({ ...child, dieta: d })}
              >
                <Text
                  style={[
                    styles.chipTextSmall,
                    child.dieta === d && styles.chipTextActive,
                  ]}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
        <TextInput
          style={styles.input}
          value={child.dieta}
          onChangeText={(text) => setChild({ ...child, dieta: text })}
          placeholder="Otra dieta o alergias..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Intereses (separados por coma)</Text>
        <TextInput
          style={styles.input}
          value={child.intereses?.join(", ")}
          onChangeText={(text) => handleChangeArray("intereses", text)}
          placeholder="Música, Arte, Juegos..."
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Enfoque (separados por coma)</Text>
        <TextInput
          style={styles.input}
          value={child.enfoque?.join(", ")}
          onChangeText={(text) => handleChangeArray("enfoque", text)}
          placeholder="Aprendizaje, Motricidad..."
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
        >
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveText}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#bde4eeff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingLeft: 8,
  },
  logo: {
    width: 70,
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    marginRight: 105,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    backgroundColor: "#F4F8FB",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d6e6ef",
  },
  rowButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "#E6F4F9",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSmall: {
    backgroundColor: "#E6F4F9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: "#51b3ddff",
    borderColor: "#1c5e7aff",
  },
  chipText: {
    color: "#1c5e7aff",
    fontWeight: "500",
  },
  chipTextSmall: {
    color: "#1c5e7aff",
    fontSize: 12,
  },
  chipTextActive: {
    color: "#fff",
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: "#1c5e7aff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
