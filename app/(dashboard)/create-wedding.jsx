import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateWeddingScreen() {
  const router = useRouter();
  const [weddingName, setWeddingName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [venue, setVenue] = useState("");

  const handleCreateWedding = () => {
    if (!weddingName || !groomName || !brideName || !weddingDate || !venue) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Store wedding data (in real app, save to backend)
    const weddingData = {
      id: Date.now(),
      weddingName,
      groomName,
      brideName,
      weddingDate,
      venue,
      createdAt: new Date().toISOString(),
    };

    console.log("Wedding Created:", weddingData);
    Alert.alert("Success", "Wedding event created successfully!");

    // Reset form
    setWeddingName("");
    setGroomName("");
    setBrideName("");
    setWeddingDate("");
    setVenue("");

    // Navigate to dashboard
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Wedding Event</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Wedding Event Name</Text>
        <TextInput
          placeholder="Enter wedding event name"
          value={weddingName}
          onChangeText={setWeddingName}
          style={styles.input}
        />

        <Text style={styles.label}>Groom Name</Text>
        <TextInput
          placeholder="Enter groom's name"
          value={groomName}
          onChangeText={setGroomName}
          style={styles.input}
        />

        <Text style={styles.label}>Bride Name</Text>
        <TextInput
          placeholder="Enter bride's name"
          value={brideName}
          onChangeText={setBrideName}
          style={styles.input}
        />

        <Text style={styles.label}>Wedding Date</Text>
        <TextInput
          placeholder="DD/MM/YYYY"
          value={weddingDate}
          onChangeText={setWeddingDate}
          style={styles.input}
        />

        <Text style={styles.label}>Venue</Text>
        <TextInput
          placeholder="Enter venue address"
          value={venue}
          onChangeText={setVenue}
          style={styles.input}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateWedding}>
          <Text style={styles.buttonText}>✓ Create Wedding</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    padding: 16,
    backgroundColor: "#6A5ACD",
    paddingTop: 20,
  },
  backButton: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
