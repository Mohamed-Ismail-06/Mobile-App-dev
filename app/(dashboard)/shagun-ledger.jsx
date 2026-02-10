import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ShaguLedgerScreen() {
  const router = useRouter();
  const [guestName, setGuestName] = useState("");
  const [amount, setAmount] = useState("");
  const [giftType, setGiftType] = useState("");
  const [ledgerEntries, setLedgerEntries] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      amount: 5000,
      type: "Cash",
      date: "2025-02-01",
    },
    {
      id: "2",
      name: "Priya Singh",
      amount: 2000,
      type: "Gift",
      date: "2025-02-02",
    },
    {
      id: "3",
      name: "Anil Sharma",
      amount: 10000,
      type: "Cash",
      date: "2025-02-03",
    },
  ]);

  const handleAddEntry = () => {
    if (!guestName || !amount || !giftType) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name: guestName,
      amount: parseInt(amount),
      type: giftType,
      date: new Date().toISOString().split("T")[0],
    };

    setLedgerEntries([...ledgerEntries, newEntry]);
    Alert.alert("Success", "Entry added to shagun ledger!");

    // Reset form
    setGuestName("");
    setAmount("");
    setGiftType("");
  };

  const totalAmount = ledgerEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );

  const handleDeleteEntry = (id) => {
    setLedgerEntries(ledgerEntries.filter((entry) => entry.id !== id));
    Alert.alert("Deleted", "Entry removed from ledger");
  };

  const renderLedgerItem = ({ item }) => (
    <View style={styles.ledgerItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.guestName}>{item.name}</Text>
        <Text style={styles.itemType}>
          {item.type} • {item.date}
        </Text>
      </View>
      <View style={styles.amountSection}>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <TouchableOpacity
          onPress={() => handleDeleteEntry(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>💰 Shagun Ledger</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Shagun Received</Text>
        <Text style={styles.totalAmount}>₹{totalAmount.toLocaleString()}</Text>
        <Text style={styles.entriesCount}>{ledgerEntries.length} Entries</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add New Entry</Text>

        <Text style={styles.label}>Guest Name</Text>
        <TextInput
          placeholder="Enter guest name"
          value={guestName}
          onChangeText={setGuestName}
          style={styles.input}
        />

        <Text style={styles.label}>Amount (₹)</Text>
        <TextInput
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gift Type</Text>
        <View style={styles.typeSelector}>
          {["Cash", "Gift", "Jewelry", "Other"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeOption,
                giftType === type && styles.typeOptionSelected,
              ]}
              onPress={() => setGiftType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  giftType === type && styles.typeTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
          <Text style={styles.buttonText}>➕ Add Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ledgerContainer}>
        <Text style={styles.sectionTitle}>Ledger Entries</Text>
        <FlatList
          data={ledgerEntries}
          renderItem={renderLedgerItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
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
  summaryCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  entriesCount: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
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
  typeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  typeOption: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  typeOptionSelected: {
    backgroundColor: "#6A5ACD",
    borderColor: "#6A5ACD",
  },
  typeText: {
    fontSize: 13,
    color: "#333",
  },
  typeTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ledgerContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  ledgerItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  itemType: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  amountSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6A5ACD",
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fee",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#f00",
    fontWeight: "bold",
  },
});
