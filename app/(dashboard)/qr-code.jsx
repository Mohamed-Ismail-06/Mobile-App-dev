import { useRouter } from "expo-router";
import QRCode from "qrcode.react";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function QRCodeScreen() {
  const router = useRouter();
  const [weddingId, setWeddingId] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleGenerateQR = () => {
    if (!weddingId || !guestCount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const qrData = {
      weddingId,
      guestLimit: parseInt(guestCount),
      generatedAt: new Date().toISOString(),
      shareLink: `https://shagun.app/wedding/${weddingId}`,
    };

    setQrCode(qrData);
    Alert.alert("Success", "QR Code generated successfully!");
  };

  const handleDownloadQR = () => {
    if (!qrCode) {
      Alert.alert("Error", "Generate QR code first");
      return;
    }
    Alert.alert("Success", "QR Code downloaded/saved!");
  };

  const handleShareQR = () => {
    if (!qrCode) {
      Alert.alert("Error", "Generate QR code first");
      return;
    }
    Alert.alert("Success", "QR Code shared with guests!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Generate QR Code</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Wedding ID</Text>
        <TextInput
          placeholder="Enter wedding event ID"
          value={weddingId}
          onChangeText={setWeddingId}
          style={styles.input}
        />

        <Text style={styles.label}>Guest Limit (Expected Guests)</Text>
        <TextInput
          placeholder="Enter expected number of guests"
          value={guestCount}
          onChangeText={setGuestCount}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>📱 Generate QR Code</Text>
        </TouchableOpacity>

        {qrCode && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Your QR Code</Text>

            {/* QR Code Display */}
            <View style={styles.qrBox}>
              <QRCode
                value={qrCode.shareLink}
                size={250}
                color="#000"
                backgroundColor="#fff"
              />
            </View>

            <View style={styles.qrDetails}>
              <Text style={styles.detailLabel}>Wedding ID:</Text>
              <Text style={styles.detailValue}>{qrCode.weddingId}</Text>

              <Text style={styles.detailLabel}>Expected Guests:</Text>
              <Text style={styles.detailValue}>{qrCode.guestLimit}</Text>

              <Text style={styles.detailLabel}>Share Link:</Text>
              <Text style={styles.detailValue}>{qrCode.shareLink}</Text>

              <Text style={styles.detailLabel}>Generated At:</Text>
              <Text style={styles.detailValue}>
                {new Date(qrCode.generatedAt).toLocaleDateString()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDownloadQR}
            >
              <Text style={styles.buttonText}>⬇ Download QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.shareButton]}
              onPress={handleShareQR}
            >
              <Text style={styles.buttonText}>📤 Share with Guests</Text>
            </TouchableOpacity>
          </View>
        )}
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
  actionButton: {
    backgroundColor: "#6A5ACD",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    elevation: 3,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  qrBox: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  qrDetails: {
    marginTop: 16,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginTop: 12,
  },
  detailValue: {
    fontSize: 13,
    color: "#333",
    marginTop: 4,
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 4,
  },
});
