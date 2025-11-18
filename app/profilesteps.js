// app/profileSteps.js  (reemplaza tu archivo actual por este)
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileSteps() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    genero: "",
    intereses: [], // para motricidad / gustos
    enfoque: [], // áreas seleccionadas por el cuidador
    dieta: "", // solo si eligió Alimentación
  });

  const router = useRouter();

  // SECUENCIA LÓGICA: siempre 'info' y 'enfoque', luego condicional 'intereses' (si seleccionó Motricidad),
  // luego condicional 'dieta' (si seleccionó Alimentación), y finalmente 'final'.
  const sequence = useMemo(() => {
    const seq = ["info", "enfoque"];
    if (formData.enfoque.includes("Motricidad")) seq.push("intereses");
    if (formData.enfoque.includes("Alimentación")) seq.push("dieta");
    seq.push("final");
    return seq;
  }, [formData.enfoque]);

  const totalSteps = sequence.length;

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

  // Guardar el niño al finalizar
  const saveChildAndFinish = async () => {
    try {
      await AsyncStorage.setItem("hasChild", "true");
      const existing = await AsyncStorage.getItem("children");
      let children = existing ? JSON.parse(existing) : [];

      // push nuevo niño
      children.push(formData);
      await AsyncStorage.setItem("children", JSON.stringify(children));

      await addNotification(`Se registró el niño/a ${formData.nombre || "sin nombre"}`);
      router.replace("/home");
    } catch (error) {
      console.log("Error guardando datos del niño:", error);
      Alert.alert("Error", "No se pudieron guardar los datos. Intenta de nuevo.");
    }
  };

  // NEXT / BACK (navegación entre pasos)
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      saveChildAndFinish();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Validación según paso lógico actual (miramos sequence[step])
  const isStepValid = () => {
    const key = sequence[step];
    switch (key) {
      case "info":
        return formData.nombre && formData.edad && formData.genero;
      case "enfoque":
        return formData.enfoque.length > 0;
      case "intereses":
        return formData.intereses.length > 0;
      case "dieta":
        return formData.dieta !== "";
      default:
        return true;
    }
  };

  // Helpers para toggles
  const toggleArrayField = (fieldName, value) => {
    const arr = [...(formData[fieldName] || [])];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }

    // Si se está desmarcando 'Motricidad' o 'Alimentación', limpiamos datos relacionados
    const newData = { ...formData, [fieldName]: arr };

    if (fieldName === "enfoque") {
      // si se quitó Motricidad -> limpiar intereses
      if (!arr.includes("Motricidad") && formData.intereses.length > 0) {
        newData.intereses = [];
      }
      // si se quitó Alimentación -> limpiar dieta
      if (!arr.includes("Alimentación") && formData.dieta) {
        newData.dieta = "";
      }
      // if we removed enfoques and current step is now beyond new sequence, adjust step
      setFormData(newData);
      // recompute sequence happens automatically via useMemo; ensure step not out-of-range
      setTimeout(() => {
        const newSeqLen = (["info", "enfoque"]
          .concat(arr.includes("Motricidad") ? ["intereses"] : [])
          .concat(arr.includes("Alimentación") ? ["dieta"] : [])
          .concat(["final"])).length;
        if (step >= newSeqLen) setStep(newSeqLen - 1);
      }, 0);
    } else {
      setFormData(newData);
    }
  };

  // Render de los pasos según la clave lógica
  const renderStep = () => {
    const key = sequence[step];
    switch (key) {
      case "info":
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¡Conoce a tu pequeño!</Text>
            <Text style={styles.subtitle}>Cuéntanos sobre tu hijo para personalizar su experiencia</Text>

            <Text style={styles.label}>¿Cómo se llama?</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe su nombre"
              value={formData.nombre}
              onChangeText={(text) => setFormData({ ...formData, nombre: text })}
            />

            <Text style={styles.label}>¿Qué edad tiene?</Text>
            <View>
              <TouchableOpacity
                style={[styles.option, formData.edad === "0-2" && styles.optionSelected]}
                onPress={() => setFormData({ ...formData, edad: "0-2" })}
              >
                <Ionicons name="baby-outline" size={20} color="#51b3ddff" />
                <Text style={styles.optionText}>0-2 años • Bebé</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, formData.edad === "3-5" && styles.optionSelected]}
                onPress={() => setFormData({ ...formData, edad: "3-5" })}
              >
                <Ionicons name="heart-outline" size={20} color="#51b3ddff" />
                <Text style={styles.optionText}>3-5 años • Preescolar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, formData.edad === "6-8" && styles.optionSelected]}
                onPress={() => setFormData({ ...formData, edad: "6-8" })}
              >
                <Ionicons name="school-outline" size={20} color="#51b3ddff" />
                <Text style={styles.optionText}>6-8 años • Escolar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Género</Text>
            <View style={styles.genderRow}>
              {["niño", "niña", "prefiero no decir"].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderButton, formData.genero === g && styles.genderSelected]}
                  onPress={() => setFormData({ ...formData, genero: g })}
                >
                  <Text style={[styles.genderText, formData.genero === g && { color: "#fff" }]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case "enfoque":
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¿En qué quieres enfocarte?</Text>
            <Text style={styles.subtitle}>Elige las áreas de desarrollo más importantes</Text>

            {[
              "Sueño",
              "Social",
              "Alimentación",
              "Aprendizaje",
              "Motricidad",
              "Dispositivos",
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.option, formData.enfoque.includes(item) && styles.optionSelected]}
                onPress={() => toggleArrayField("enfoque", item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <Text style={{ marginTop: 8, color: "#555" }}>
              Nota: según lo que elijas, te preguntaremos cosas específicas (por ejemplo, intereses si eliges Motricidad).
            </Text>
          </View>
        );

      case "intereses": // aparece solo si seleccionó Motricidad
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¿Qué le gusta a {formData.nombre || "el niño"}?</Text>
            <Text style={styles.subtitle}>Selecciona sus intereses (esto guía actividades motrices)</Text>

            {["Jugar", "Socializar", "Leer", "Deportes", "Música", "Arte"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.option, formData.intereses.includes(item) && styles.optionSelected]}
                onPress={() => toggleArrayField("intereses", item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}

            <Text style={{ marginTop: 8, color: "#555" }}>
              Estos intereses se usan para priorizar actividades en la sección Motricidad.
            </Text>
          </View>
        );

      case "dieta": // aparece solo si seleccionó Alimentación
        return (
          <View style={styles.card}>
            <Text style={styles.title}>Preferencias Alimentarias</Text>
            <Text style={styles.subtitle}>Selecciona el tipo de dieta que sigue {formData.nombre || "el niño"}</Text>

            {["Estándar", "Vegetariana", "Vegana", "Sin gluten", "Sin lácteos", "Alergias específicas"].map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.option, formData.dieta === item && styles.optionSelected]}
                  onPress={() => setFormData({ ...formData, dieta: item })}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )
            )}

            <Text style={{ marginTop: 8, color: "#555" }}>
              Nota: si más adelante decides no enfocar en Alimentación, esta información no será obligatoria.
            </Text>
          </View>
        );

      case "final":
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¡Perfil creado con éxito!</Text>
            <Text style={styles.subtitle}>Ya puedes comenzar a explorar contenido personalizado para {formData.nombre}.</Text>
            <Ionicons style={styles.final} name="checkmark-circle-outline" size={80} color="#71bb74ff" />
          </View>
        );

      default:
        return null;
    }
  };

  // Para mostrar un label del paso actual entendible (opcional)
  const stepLabel = () => {
    const key = sequence[step];
    switch (key) {
      case "info":
        return "Datos del niño";
      case "enfoque":
        return "Áreas de enfoque";
      case "intereses":
        return "Intereses (motricidad)";
      case "dieta":
        return "Preferencias alimentarias";
      case "final":
        return "Finalizar";
      default:
        return "";
    }
  };

  return (
    <LinearGradient colors={["#F6FBFF", "#EAF3FF"]} style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color="#1c5e7aff" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "700", color: "#1c5e7aff" }}>{stepLabel()}</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Barra de progreso dinámica */}
        <View style={styles.progressBar}>
          {[...Array(totalSteps)].map((_, i) => (
            <View key={i} style={styles.progressStep}>
              <View style={[styles.circle, i <= step ? styles.circleActive : styles.circleInactive]}>
                <Text style={styles.circleText}>{i + 1}</Text>
              </View>
              {i < totalSteps - 1 && (
                <View style={[styles.line, i < step ? styles.lineActive : styles.lineInactive]} />
              )}
            </View>
          ))}
        </View>
        <Text style={styles.stepText}>Paso {step + 1} de {totalSteps}</Text>

        {/* Paso actual (render dinámico) */}
        {renderStep()}

        {/* Botones navegación */}
        <View style={styles.navButtons}>
          {step > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backText}>Anterior</Text>
            </TouchableOpacity>
          )}

          {step < totalSteps - 1 ? (
            <TouchableOpacity
              style={[styles.nextButton, !isStepValid() && { backgroundColor: "#ccc" }]}
              onPress={isStepValid() ? handleNext : null}
            >
              <Text style={styles.nextText}>Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.finishButton} onPress={isStepValid() ? handleNext : null}>
              <Text style={styles.finishText}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
    backgroundColor: "transparent",
    zIndex: 10,
    marginBottom: -40,
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2895b6ff",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#F9FCFF",
  },
  optionSelected: {
    borderColor: "#2895b6ff",
    backgroundColor: "#E6F0FF",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000000ff",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#2895b6ff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  genderSelected: {
    backgroundColor: "#2895b6ff",
  },
  genderText: {
    color: "#2895b6ff",
    fontSize: 14,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  circleActive: {
    backgroundColor: "#2895b6ff",
  },
  circleInactive: {
    backgroundColor: "#ccc",
  },
  circleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  line: {
    height: 2,
    width: 30,
  },
  lineActive: {
    backgroundColor: "#2895b6ff",
  },
  lineInactive: {
    backgroundColor: "#ccc",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  backButton: {
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#2895b6ff",
    minWidth: 120,
    alignItems: "center",
  },
  backText: {
    color: "#2895b6ff",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#2895b6ff",
    padding: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
  },
  finishButton: {
    backgroundColor: "#41a157ff",
    padding: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  finishText: {
    color: "#fff",
    fontWeight: "bold",
  },
  final: {
    marginLeft: 130,
  },
  stepText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
});
