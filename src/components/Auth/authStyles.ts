import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  content: { flexGrow: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 30, fontWeight: "800", color: "#111827" },
  subtitle: { fontSize: 15, color: "#6B7280", marginTop: 6, marginBottom: 28 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: "#6B7280", fontSize: 14 },
  footerLink: { color: "#208AEF", fontSize: 14, fontWeight: "700" },
  formError: { color: "#EF4444", marginBottom: 12, textAlign: "center" },
});
