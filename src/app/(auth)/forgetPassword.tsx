import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSignIn } from "@clerk/expo/legacy";
import { Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme === "unspecified" ? "light" : colorScheme];

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [successfulCreation, setSuccessfulCreation] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isLoaded) {
    return (
      <ThemedView
        style={[styles.loading, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  async function create() {
    setIsSubmitting(true);
    setError("");
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function reset() {
    setIsSubmitting(true);
    setError("");
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (!result) return;

      if (result.status === "needs_second_factor") {
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
      } else if (result.status === "complete") {
        // Set the active session to
        // the newly created session (user is now signed in)
        await setActive?.({
          session: result.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Handle pending session tasks
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.replace("/");
          },
        });
        setError("");
      } else {
        setError("Your password could not be reset. Please try again.");
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={[styles.screen, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.heading}>
              <View style={styles.eyebrow}>
                <ThemedText style={styles.eyebrowText}>
                  ACCOUNT RECOVERY
                </ThemedText>
              </View>
              <ThemedText type="title" style={styles.title}>
                {successfulCreation ? "Check your email" : "Reset password"}
              </ThemedText>
              <ThemedText style={styles.description}>
                {successfulCreation
                  ? `We sent a reset code to ${email}. Enter it below with your new password.`
                  : "Enter the email address linked to your account and we’ll send you a reset code."}
              </ThemedText>
            </View>

            <View
              style={[
                styles.form,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#1E2224" : "#FFFFFF",
                  borderColor: colorScheme === "dark" ? "#343A3D" : "#E5E9EB",
                },
              ]}
            >
              {!successfulCreation ? (
                <View style={styles.field}>
                  <ThemedText style={styles.label}>Email address</ThemedText>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        backgroundColor: colors.background,
                        borderColor:
                          colorScheme === "dark" ? "#41494D" : "#D9E0E3",
                      },
                    ]}
                    placeholder="you@example.com"
                    placeholderTextColor={
                      colorScheme === "dark" ? "#929A9E" : "#7A858A"
                    }
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoComplete="email"
                    accessibilityLabel="Email address"
                  />
                </View>
              ) : (
                <>
                  <View style={styles.field}>
                    <ThemedText style={styles.label}>Reset code</ThemedText>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: colors.text,
                          backgroundColor: colors.background,
                          borderColor:
                            colorScheme === "dark" ? "#41494D" : "#D9E0E3",
                        },
                      ]}
                      placeholder="Enter the code from your email"
                      placeholderTextColor={
                        colorScheme === "dark" ? "#929A9E" : "#7A858A"
                      }
                      value={code}
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      autoComplete="one-time-code"
                      accessibilityLabel="Password reset code"
                    />
                  </View>
                  <View style={styles.field}>
                    <ThemedText style={styles.label}>New password</ThemedText>
                    <View
                      style={[
                        styles.passwordInputContainer,
                        {
                          backgroundColor: colors.background,
                          borderColor:
                            colorScheme === "dark" ? "#41494D" : "#D9E0E3",
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.passwordInput, { color: colors.text }]}
                        placeholder="Create a new password"
                        placeholderTextColor={
                          colorScheme === "dark" ? "#929A9E" : "#7A858A"
                        }
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoComplete="new-password"
                        accessibilityLabel="New password"
                      />
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={
                          showPassword ? "Hide password" : "Show password"
                        }
                        accessibilityState={{ checked: showPassword }}
                        hitSlop={8}
                        style={styles.passwordVisibilityButton}
                        onPress={() => setShowPassword((visible) => !visible)}
                      >
                        <SymbolView
                          name={{
                            ios: showPassword ? "eye.slash" : "eye",
                            android: showPassword
                              ? "visibility_off"
                              : "visibility",
                            web: showPassword ? "visibility_off" : "visibility",
                          }}
                          size={20}
                          tintColor={
                            colorScheme === "dark" ? "#9BA1A6" : "#687076"
                          }
                        />
                      </Pressable>
                    </View>
                  </View>
                </>
              )}

              {error ? (
                <View
                  style={[
                    styles.errorContainer,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#3A2426" : "#FFF1F0",
                    },
                  ]}
                >
                  <ThemedText
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {error}
                  </ThemedText>
                </View>
              ) : null}

              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.button,
                  ((!email && !successfulCreation) ||
                    (successfulCreation && (!password || !code)) ||
                    isSubmitting) &&
                    styles.buttonDisabled,
                  pressed && styles.buttonPressed,
                ]}
                onPress={successfulCreation ? reset : create}
                disabled={
                  isSubmitting ||
                  (!successfulCreation && !email) ||
                  (successfulCreation && (!password || !code))
                }
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <ThemedText style={styles.buttonText}>
                    {successfulCreation
                      ? "Save new password"
                      : "Send reset code"}
                  </ThemedText>
                )}
              </Pressable>

              {successfulCreation ? (
                <Pressable
                  accessibilityRole="button"
                  style={styles.textButton}
                  onPress={async () => {
                    setError("");
                    setIsSubmitting(true);
                    try {
                      await signIn?.create({
                        strategy: "reset_password_email_code",
                        identifier: email,
                      });
                    } catch (err: unknown) {
                      setError(getErrorMessage(err));
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <ThemedText type="link" style={styles.link}>
                    Resend reset code
                  </ThemedText>
                </Pressable>
              ) : null}
              {successfulCreation ? (
                <Pressable
                  accessibilityRole="button"
                  style={styles.textButton}
                  onPress={() => {
                    setSuccessfulCreation(false);
                    setCode("");
                    setPassword("");
                    setError("");
                  }}
                >
                  <ThemedText style={styles.secondaryLink}>
                    Use a different email
                  </ThemedText>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.footer}>
              <Link href="/sign-in">
                <ThemedText type="link" style={styles.link}>
                  Back to sign in
                </ThemedText>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  heading: {
    marginBottom: 28,
    gap: 12,
  },
  eyebrow: {
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "#E7F5F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  eyebrowText: {
    color: "#087C99",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.72,
  },
  form: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    gap: 18,
    shadowColor: "#17252B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  field: {
    gap: 8,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    minHeight: 50,
  },
  passwordInputContainer: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
  },
  passwordVisibilityButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  button: {
    backgroundColor: "#0a7ea4",
    minHeight: 50,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  errorContainer: {
    padding: 14,
    borderRadius: 10,
  },
  errorText: {
    color: "#c62828",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
  },
  textButton: {
    alignSelf: "center",
    paddingVertical: 4,
  },
  footer: {
    alignItems: "center",
    marginTop: 22,
  },
  link: {
    fontWeight: "700",
    color: "#0a7ea4",
  },
  secondaryLink: {
    color: "#65747A",
    fontSize: 14,
  },
});

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
