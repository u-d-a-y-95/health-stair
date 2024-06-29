import { UText } from "@/components/uComponents/uText";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <UText>This screen doesn't exist.</UText>
      <Link href="/" style={styles.link}>
        <UText>Go to home screen!</UText>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
