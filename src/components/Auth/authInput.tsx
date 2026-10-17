import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

const AuthInput = ({ label, error, isPassword, ...rest }: Props) => {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9AA0A6"
          autoCapitalize="none"
          secureTextEntry={isPassword && hidden}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            {hidden ? (
              <EyeOff size={20} color="#9AA0A6" />
            ) : (
              <Eye size={20} color="#9AA0A6" />
            )}
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, color: "#1F2937" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F9FAFB",
  },
  inputError: { borderColor: "#EF4444" },
  input: { flex: 1, height: 52, fontSize: 16, color: "#111827" },
  error: { color: "#EF4444", fontSize: 12, marginTop: 4 },
});

export default AuthInput;
