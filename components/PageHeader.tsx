import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { canOpenURL, openURL } from "expo-linking";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";

interface PageHeaderType {
  title: string;
  headerAction?: {
    title: string;
    link: string;
  };
}

export function PageHeader({ title, headerAction }: PageHeaderType) {
  const goToAuthorPage = async () => {
    let authorUrl = "https://www.linkedin.com/in/suleymanddonmez/";
    let isValidUrl = await canOpenURL(authorUrl);
    if (isValidUrl) {
      openURL(authorUrl);
    } else {
      alert("Invalid URL!");
    }
  };
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedView>
        <ThemedText type="title">{title}</ThemedText>
        <TouchableWithoutFeedback onPress={goToAuthorPage}>
          <ThemedText type="link">by Süleyman Dönmez</ThemedText>
        </TouchableWithoutFeedback>
      </ThemedView>
      {headerAction && (
        <Link href={headerAction.link} asChild>
          <ThemedButton>
            <ThemedText type="defaultSemiBold">{headerAction.title}</ThemedText>
          </ThemedButton>
        </Link>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});
