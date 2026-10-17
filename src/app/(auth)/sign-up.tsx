import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      // Check why the sign-up is not complete
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Verify your account
        </ThemedText>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <ThemedText style={styles.error}>
            {errors.fields.code.message}
          </ThemedText>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === "fetching" && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === "fetching"}
        >
          <ThemedText style={styles.buttonText}>Verify</ThemedText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <ThemedText style={styles.secondaryButtonText}>
            I need a new code
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Sign up
        </ThemedText>

        <ThemedText style={styles.label}>Email address</ThemedText>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          keyboardType="email-address"
        />
        {errors.fields.emailAddress && (
          <ThemedText style={styles.error}>
            {errors.fields.emailAddress.message}
          </ThemedText>
        )}
        <ThemedText style={styles.label}>Password</ThemedText>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#666666"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
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
                android: showPassword ? "visibility_off" : "visibility",
                web: showPassword ? "visibility_off" : "visibility",
              }}
              size={20}
              tintColor="#687076"
            />
          </Pressable>
        </View>
        {errors.fields.password && (
          <ThemedText style={styles.error}>
            {errors.fields.password.message}
          </ThemedText>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            (!emailAddress || !password || fetchStatus === "fetching") &&
              styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
          disabled={!emailAddress || !password || fetchStatus === "fetching"}
        >
          <ThemedText style={styles.buttonText}>Sign up</ThemedText>
        </Pressable>

        <View style={styles.linkContainer}>
          <ThemedText>Already have an account? </ThemedText>
          <Link href="/sign-in">
            <ThemedText type="link">Sign in</ThemedText>
          </Link>
        </View>

        {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
        <View nativeID="clerk-captcha" />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    gap: 12,
  },
  title: {
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  passwordInputContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#11181C",
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 12,
    alignItems: "center",
  },
  error: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: -8,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
});
