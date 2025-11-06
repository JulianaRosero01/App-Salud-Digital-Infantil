// app/notificaciones.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Notificaciones() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const json = await AsyncStorage.getItem("notifications");
        setNotifications(json ? JSON.parse(json) : []);
      };
      load();
    }, [])
  );

  const clearAll = async () => {
    await AsyncStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
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

        <Text style={styles.title}>Notificaciones</Text>
      </View>

      {/* BOTÓN LIMPIAR */}
      {notifications.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
          <Ionicons name="trash-outline" size={20} color="#1c5e7aff" />
          <Text style={styles.clearText}>Borrar todo</Text>
        </TouchableOpacity>
      )}

      {/* LISTADO */}
      <ScrollView style={{ marginTop: 15 }}>
        {notifications.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="notifications-off-outline" size={40} color="#999" />
            <Text style={styles.emptyText}>No tienes notificaciones aún.</Text>
          </View>
        ) : (
          notifications.map((n, i) => (
            <View key={i} style={styles.notiCard}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1c5e7aff"
                style={{ marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.notiText}>{n.message}</Text>
                <Text style={styles.notiDate}>
                  {new Date(n.date).toLocaleString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bde4eeff",
    padding: 15,
    paddingTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: -70,
  },
  logo: {
    width: 70,
    height: 80,
    marginLeft:-20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    marginRight:110,
  },

  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
    marginRight: 5,
  },
  clearText: {
    color: "#1c5e7aff",
    marginLeft: 5,
    fontSize: 13,
  },

  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    marginTop: 15,
  },
  emptyText: {
    marginTop: 10,
    color: "#555",
  },
  notiCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notiText: {
    fontSize: 14,
    color: "#000",
  },
  notiDate: {
    fontSize: 11,
    color: "#666",
  },
});
