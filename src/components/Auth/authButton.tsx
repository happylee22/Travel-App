import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const AuthButton = ({ title, onPress, loading, disabled }: Props) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [
      styles.button,
      (disabled || loading) && styles.disabled,
      pressed && { opacity: 0.85 },
    ]}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#208AEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabled: { opacity: 0.6 },
  text: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default AuthButton;
