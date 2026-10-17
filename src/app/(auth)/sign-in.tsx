import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSignIn } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    try {
      const { error } = await signIn.password({
        emailAddress,
        password,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      // ...rest of your sign-in logic (status checks, finalize, etc.)
    } catch (err) {
      // Unexpected failures, like a network drop
      console.error(JSON.stringify(err, null, 2));
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/homeScreen");
          if (url.startsWith("http")) {
            window.location.replace(url);
          } else {
            router.replace(url as Href);
          }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/device-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/homeScreen");
          if (url.startsWith("http")) {
            window.location.replace(url);
          } else {
            router.replace(url as Href);
          }
        },
      });
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <ThemedView style={styles.container}>
        <ThemedText
          type="title"
          style={[styles.title, { fontSize: 24, fontWeight: "bold" }]}
        >
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
          onPress={() => signIn.mfa.sendEmailCode()}
        >
          <ThemedText style={styles.secondaryButtonText}>
            I need a new code
          </ThemedText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => signIn.reset()}
        >
          <ThemedText style={styles.secondaryButtonText}>Start over</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Sign in
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
        {errors.fields.identifier && (
          <ThemedText style={styles.error}>
            {errors.fields.identifier.message}
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
            autoComplete="current-password"
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
        <View style={styles.resetPasswordContainer}>
          <Link href="/forgetPassword">
            <ThemedText type="link" style={styles.resetPasswordText}>
              Forgot password?
            </ThemedText>
          </Link>
        </View>
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
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </Pressable>

        <View style={styles.linkContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <ThemedText>New here? </ThemedText>
            <Link href="/sign-up">
              <ThemedText type="link">Sign up</ThemedText>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  resetPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 2,
  },
  resetPasswordText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
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
