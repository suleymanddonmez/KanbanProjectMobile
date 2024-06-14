import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { PageHeader } from "@/components/PageHeader";
import { ProjectType, fetchApi } from "@/api/BaseAction";

export default function New() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!title) {
      setError("Project title is required!");
      return false;
    }
    setError("");
    return true;
  };
  const saveProject = async () => {
    setIsLoading(true);
    if (validateForm()) {
      const response = await fetchApi<ProjectType>("/api/projects", "POST", {
        title: title,
      });
      if (response.success) {
        router.push(`/`);
      } else {
        setError(response.error || "An error occurred!");
      }
    }
    setIsLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PageHeader
          title={"New Project"}
          headerAction={{
            title: "All Projects",
            link: "/",
          }}
        />
        <ThemedView contentContainerStyle={styles.formContainer} isScrollable={true}>
          <ThemedText>Yeni Form</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  formContainer: {
    backgroundColor: "rgb(38,38,38)",
  },
});
