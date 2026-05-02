import { StyleSheet, Text, View } from "react-native";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achieva 🏆</Text>
      <Text style={styles.subtitle}>Your feed will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { marginTop: 8, color: "#6b7280" },
});
