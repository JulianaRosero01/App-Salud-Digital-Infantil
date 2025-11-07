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

  // 👉 cerrar sesión (destructivo)
  const handleLogout = async () => {
    Alert.alert(
      "⚠️ Cerrar sesión",
      "¿Seguro que deseas cerrar sesión?\n\nSe eliminarán los niños registrados, notificaciones y tu avance local. Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("hasChild");
              await AsyncStorage.removeItem("children");
              await AsyncStorage.removeItem("notifications");
              router.replace("/welcome");
            } catch (error) {
              console.log("Error al cerrar sesión:", error);
            }
          },
        },
      ]
    );
  };

  // 👉 borrar solo notificaciones
  const handleClearNotifications = () => {
    Alert.alert(
      "Borrar notificaciones",
      "Se eliminarán todas las notificaciones guardadas en esta app.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          onPress: async () => {
            await AsyncStorage.removeItem("notifications");
          },
        },
      ]
    );
  };

  // 👉 borrar solo niños
  const handleClearChildren = () => {
    Alert.alert(
      "Borrar niños registrados",
      "Esto quitará los niños guardados y ya no se mostrará su contenido personalizado.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar niños",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("hasChild");
            await AsyncStorage.removeItem("children");
          },
        },
      ]
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
        {/* PREFERENCIAS */}
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

        {/* CUENTA / DATOS LOCALES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos locales</Text>

          <TouchableOpacity style={styles.option} onPress={handleClearNotifications}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="trash-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Borrar notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleClearChildren}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="people-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Borrar niños registrados</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* CUENTA (visual, aunque no haya login real) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>

          <TouchableOpacity style={styles.option} onPress={() => router.push("/profile")}>
            <View style={styles.optionTextContainer}>
              <Ionicons name="person-outline" size={22} color="#1c5e7aff" />
              <Text style={styles.optionText}>Editar perfil del niño</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>

          
        </View>

        {/* AVISO ROJO */}
        <View style={styles.warningBox}>
          <Ionicons name="warning-outline" size={22} color="#d9534f" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.warningTitle}>Acción irreversible</Text>
            <Text style={styles.warningText}>
              Cerrar sesión borrará toda la información guardada en este dispositivo.
            </Text>
          </View>
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

  warningBox: {
    flexDirection: "row",
    backgroundColor: "#fcebea",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  warningTitle: {
    fontWeight: "bold",
    color: "#d9534f",
  },
  warningText: {
    fontSize: 12,
    color: "#a94442",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d9534f", // rojo
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
