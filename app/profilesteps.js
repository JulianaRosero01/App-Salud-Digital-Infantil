import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ProfileSteps() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    genero: "",
    intereses: [],
    enfoque: [],
    dieta: "",
  });

  const router = useRouter();

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      router.push("/home"); // Pantalla final
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Validación por pasos
  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.nombre && formData.edad && formData.genero;
      case 1:
        return formData.intereses.length > 0;
      case 2:
        return formData.enfoque.length > 0;
      case 3:
        return formData.dieta !== "";
      default:
        return true;
    }
  };

  // Render de pasos
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¡Conoce a tu pequeño!</Text>
            <Text style={styles.subtitle}>
              Cuéntanos sobre tu hijo para personalizar su experiencia
            </Text>

            <Text style={styles.label}>¿Cómo se llama?</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe su nombre"
              value={formData.nombre}
              onChangeText={(text) =>
                setFormData({ ...formData, nombre: text })
              }
            />

            <Text style={styles.label}>¿Qué edad tiene?</Text>
            <View>
              <TouchableOpacity
                style={[
                  styles.option,
                  formData.edad === "0-2" && styles.optionSelected,
                ]}
                onPress={() => setFormData({ ...formData, edad: "0-2" })}
              >
                <Ionicons name="baby-outline" size={20} color="#0057FF" />
                <Text style={styles.optionText}>0-2 años • Bebé</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.option,
                  formData.edad === "3-5" && styles.optionSelected,
                ]}
                onPress={() => setFormData({ ...formData, edad: "3-5" })}
              >
                <Ionicons name="heart-outline" size={20} color="#0057FF" />
                <Text style={styles.optionText}>3-5 años • Preescolar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.option,
                  formData.edad === "6-8" && styles.optionSelected,
                ]}
                onPress={() => setFormData({ ...formData, edad: "6-8" })}
              >
                <Ionicons name="school-outline" size={20} color="#0057FF" />
                <Text style={styles.optionText}>6-8 años • Escolar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Género</Text>
            <View style={styles.genderRow}>
              {["niño", "niña", "prefiero no decir"].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderButton,
                    formData.genero === g && styles.genderSelected,
                  ]}
                  onPress={() => setFormData({ ...formData, genero: g })}
                >
                  <Text
                    style={[
                      styles.genderText,
                      formData.genero === g && { color: "#fff" },
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.card}>
            <Text style={styles.title}>
              ¿Qué le gusta a {formData.nombre}?
            </Text>
            <Text style={styles.subtitle}>
              Selecciona sus intereses favoritos
            </Text>
            {["Música", "Libros", "Juegos", "Socializar", "Arte", "Deportes"].map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.option,
                    formData.intereses.includes(item) && styles.optionSelected,
                  ]}
                  onPress={() => {
                    const intereses = [...formData.intereses];
                    if (intereses.includes(item)) {
                      intereses.splice(intereses.indexOf(item), 1);
                    } else {
                      intereses.push(item);
                    }
                    setFormData({ ...formData, intereses });
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        );

      case 2:
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¿En qué quieres enfocarte?</Text>
            <Text style={styles.subtitle}>
              Elige las áreas de desarrollo más importantes
            </Text>
            {["Alimentación", "Sueño", "Social", "Aprendizaje", "Motricidad"].map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.option,
                    formData.enfoque.includes(item) && styles.optionSelected,
                  ]}
                  onPress={() => {
                    const enfoque = [...formData.enfoque];
                    if (enfoque.includes(item)) {
                      enfoque.splice(enfoque.indexOf(item), 1);
                    } else {
                      enfoque.push(item);
                    }
                    setFormData({ ...formData, enfoque });
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        );

      case 3:
        return (
          <View style={styles.card}>
            <Text style={styles.title}>Preferencias Alimentarias</Text>
            <Text style={styles.subtitle}>
              Selecciona el tipo de dieta que sigue {formData.nombre}
            </Text>
            {[
              "Estándar",
              "Vegetariana",
              "Vegana",
              "Sin gluten",
              "Sin lácteos",
              "Alergias específicas",
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  formData.dieta === item && styles.optionSelected,
                ]}
                onPress={() => setFormData({ ...formData, dieta: item })}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 4:
        return (
          <View style={styles.card}>
            <Text style={styles.title}>¡Perfil creado con éxito!</Text>
            <Text style={styles.subtitle}>
              Ya puedes comenzar a explorar contenido personalizado para{" "}
              {formData.nombre}.
            </Text>
            <Ionicons
              name="checkmark-circle-outline"
              size={60}
              color="#4CAF50"
              style={{ marginVertical: 20 }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={["#F6FBFF", "#EAF3FF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Barra de progreso */}
        <View style={styles.progressBar}>
          {[...Array(totalSteps)].map((_, i) => (
            <View key={i} style={styles.progressStep}>
              <View
                style={[
                  styles.circle,
                  i <= step ? styles.circleActive : styles.circleInactive,
                ]}
              >
                <Text style={styles.circleText}>{i + 1}</Text>
              </View>
              {i < totalSteps - 1 && (
                <View
                  style={[
                    styles.line,
                    i < step ? styles.lineActive : styles.lineInactive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Paso actual */}
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
              style={[
                styles.nextButton,
                !isStepValid() && { backgroundColor: "#ccc" },
              ]}
              onPress={isStepValid() ? handleNext : null}
            >
              <Text style={styles.nextText}>Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleNext}
            >
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
    color: "#0057FF",
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
    borderColor: "#0057FF",
    backgroundColor: "#E6F0FF",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#0057FF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  genderSelected: {
    backgroundColor: "#0057FF",
  },
  genderText: {
    color: "#0057FF",
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
    backgroundColor: "#0057FF",
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
    backgroundColor: "#0057FF",
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
    borderColor: "#0057FF",
    minWidth: 120,
    alignItems: "center",
  },
  backText: {
    color: "#0057FF",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#0057FF",
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
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  finishText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
