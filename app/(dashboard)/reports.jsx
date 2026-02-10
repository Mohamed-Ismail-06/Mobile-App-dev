import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ReportsScreen() {
  const router = useRouter();
  const [reportType, setReportType] = useState(null);

  // Sample data
  const reportData = {
    summary: {
      totalShaguAmount: 150000,
      totalGuests: 85,
      totalEntries: 87,
      avgAmount: 1724,
    },
    cashBreakdown: {
      cash: 95000,
      gift: 35000,
      jewelry: 20000,
    },
    topContributors: [
      { name: "Rajesh Kumar", amount: 10000 },
      { name: "Priya Singh", amount: 8500 },
      { name: "Anil Sharma", amount: 7500 },
      { name: "Neha Patel", amount: 6500 },
      { name: "Vikram Singh", amount: 5500 },
    ],
  };

  const handleDownloadReport = (type) => {
    Alert.alert("Success", `${type} report downloaded!`);
  };

  const handleShareReport = (type) => {
    Alert.alert("Success", `${type} report shared!`);
  };

  const handlePrintReport = (type) => {
    Alert.alert("Success", `${type} report sent to printer!`);
  };

  const ReportCard = ({ title, icon, data, reportKey }) => (
    <View style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportTitle}>
          {icon} {title}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleDownloadReport(title)}>
            <Text style={styles.actionText}>⬇</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShareReport(title)}>
            <Text style={styles.actionText}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePrintReport(title)}>
            <Text style={styles.actionText}>🖨</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportContent}>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <View key={key} style={styles.dataRow}>
              <Text style={styles.dataLabel}>
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </Text>
              <Text style={styles.dataValue}>
                {typeof value === "number" && value > 100
                  ? `₹${value.toLocaleString()}`
                  : value}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📊 Reports & Analytics</Text>
      </View>

      {/* Summary Report */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary Report</Text>
        <ReportCard
          title="Overall Summary"
          icon="📈"
          data={reportData.summary}
        />
      </View>

      {/* Breakdown Report */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Breakdown</Text>
        <ReportCard
          title="Cash vs Gift vs Jewelry"
          icon="💰"
          data={reportData.cashBreakdown}
        />
      </View>

      {/* Top Contributors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Contributors</Text>
        <View style={styles.reportCard}>
          <Text style={styles.reportTitle}>🏆 Top 5 Contributors</Text>
          {reportData.topContributors.map((contributor, index) => (
            <View key={index} style={styles.contributorRow}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <Text style={styles.contributorName}>{contributor.name}</Text>
              <Text style={styles.contributorAmount}>
                ₹{contributor.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Advanced Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Analytics</Text>
        <View style={styles.analyticsGrid}>
          <TouchableOpacity
            style={styles.analyticsCard}
            onPress={() =>
              Alert.alert("Guest Analysis", "Detailed guest breakdown report")
            }
          >
            <Text style={styles.analyticsIcon}>👥</Text>
            <Text style={styles.analyticsTitle}>Guest Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.analyticsCard}
            onPress={() => Alert.alert("Timeline", "Shagun received over time")}
          >
            <Text style={styles.analyticsIcon}>📅</Text>
            <Text style={styles.analyticsTitle}>Timeline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.analyticsCard}
            onPress={() =>
              Alert.alert("Category Stats", "Breakdown by gift type")
            }
          >
            <Text style={styles.analyticsIcon}>🎁</Text>
            <Text style={styles.analyticsTitle}>Category Stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.analyticsCard}
            onPress={() => Alert.alert("Comparison", "Year-over-year analysis")}
          >
            <Text style={styles.analyticsIcon}>📊</Text>
            <Text style={styles.analyticsTitle}>Comparison</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Export Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Options</Text>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => Alert.alert("Success", "Report exported as PDF!")}
        >
          <Text style={styles.exportIcon}>📄</Text>
          <Text style={styles.exportText}>Export as PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => Alert.alert("Success", "Report exported as Excel!")}
        >
          <Text style={styles.exportIcon}>📊</Text>
          <Text style={styles.exportText}>Export as Excel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => Alert.alert("Success", "Report sent to email!")}
        >
          <Text style={styles.exportIcon}>📧</Text>
          <Text style={styles.exportText}>Send via Email</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionText: {
    fontSize: 18,
  },
  reportContent: {
    gap: 8,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  dataLabel: {
    fontSize: 13,
    color: "#666",
  },
  dataValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6A5ACD",
  },
  contributorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6A5ACD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contributorName: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  contributorAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6A5ACD",
  },
  analyticsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  analyticsCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    elevation: 2,
  },
  analyticsIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  analyticsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  exportIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  exportText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
