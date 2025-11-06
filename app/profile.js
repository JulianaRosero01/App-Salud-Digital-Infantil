import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Profile() {
  const router = useRouter();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 función para guardar notificaciones
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

  // cargar cada vez que entro
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const json = await AsyncStorage.getItem("children");
          if (json) {
            setChildren(JSON.parse(json));
          } else {
            setChildren([]);
          }
        } catch (err) {
          console.log("Error leyendo children:", err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [])
  );

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
        <Text style={styles.title}>Perfil del niño</Text>
      </View>

      {/* Lista de niños */}
      {loading ? (
        <Text style={{ marginTop: 20 }}>Cargando...</Text>
      ) : children.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No hay niños registrados todavía.</Text>
      ) : (
        children.map((child, index) => (
          <View key={index} style={styles.profileCard}>
            <View style={styles.infoRow}>
              <Ionicons
                name="person-circle-outline"
                size={70}
                color="#1c5e7aff"
              />
              <View>
                <Text style={styles.name}>{child.nombre || "Sin nombre"}</Text>
                {child.edad ? (
                  <Text style={styles.smallText}>Edad: {child.edad}</Text>
                ) : null}
                {child.genero ? (
                  <Text style={styles.smallText}>Género: {child.genero}</Text>
                ) : null}

                {/* botón editar */}
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: "/editar-perfil", // dejas la ruta que estás usando ahora
                      params: { index },
                    })
                  }
                >
                  <Ionicons name="create-outline" size={18} color="#ffffff" />
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>

                {/* NUEVO: usar este niño */}
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={async () => {
                    // guardamos qué niño está activo
                    await AsyncStorage.setItem(
                      "activeChildIndex",
                      String(index)
                    );
                    // opcional: notificación interna
                    await addNotification(
                      `Se seleccionó a ${child.nombre || "un niño"} como activo`
                    );
                    // mandamos al home para ver contenido de ese niño
                    router.push("/home");
                  }}
                >
                  <Text style={styles.selectText}>Usar este niño</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}

      {/* Agregar otro niño */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={async () => {
          await addNotification("Se inició el registro de un nuevo niño");
          router.push("/profilesteps");
        }}
      >
        <Ionicons name="add-circle-outline" size={26} color="#ffffff" />
        <Text style={styles.addText}>Agregar otro niño</Text>
      </TouchableOpacity>
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  smallText: {
    fontSize: 12,
    color: "#555",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#51b3ddff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 6,
  },
  editText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 13,
  },
  // nuevo botón
  selectButton: {
    marginTop: 5,
    backgroundColor: "#1c5e7aff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  selectText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c5e7aff",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
