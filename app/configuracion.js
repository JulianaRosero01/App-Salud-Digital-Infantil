import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuracion() {
  const router = useRouter();
  const [notificaciones, setNotificaciones] = React.useState(true);
  const [modoOscuro, setModoOscuro] = React.useState(false);

  // 👉 función para cerrar sesión
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, salir",
          onPress: async () => {
            try {
              // eliminamos datos locales
              await AsyncStorage.removeItem("hasChild");
              await AsyncStorage.removeItem("children");
              await AsyncStorage.removeItem("notifications");

              // redirigimos al inicio
              router.replace("/welcome");
            } catch (error) {
              console.log("Error al cerrar sesión:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1c5e7aff" />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
        <Ionicons name="settings-outline" size={24} color="#1c5e7aff" />
      </View>

      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

          <View style={styles.option}>
            <View style={styles.optionTextContainer}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1c5e7aff"
              />
              <Text style={styles.optionText}>Notificaciones</Text>
            </View>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{ true: "#51b3ddff", false: "#ccc" }}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="moon-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Modo oscuro</Text>
            </View>
            <Switch
              value={modoOscuro}
              onValueChange={setModoOscuro}
              trackColor={{ true: "#51b3ddff", false: "#ccc" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="person-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Editar perfil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Cambiar contraseña</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#bde4eeff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1c5e7aff",
    marginBottom: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#51b3ddff",
    borderRadius: 25,
    paddingVertical: 12,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
});
