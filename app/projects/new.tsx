import { useState } from "react";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ProjectType, fetchApi } from "@/api/BaseAction";
import { PageWrapper } from "@/components/PageWrapper";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { AlertBox } from "@/components/AlertBox";
import { PageLoader } from "@/components/PageLoader";

export default function NewProject() {
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
        router.replace("/");
      } else {
        setError(response.error || "An error occurred!");
      }
    }
    setIsLoading(false);
  };

  return (
    <PageWrapper
      pageHeaderProps={{
        title: "New Project",
        headerActions: [
          {
            title: "All Projects",
            link: "/",
          },
        ],
      }}
    >
      <PageLoader visible={isLoading} />
      <ThemedView className="p-4 rounded-xl mb-4" darkColor="rgb(38,38,38)">
        <ThemedTextInput label={"Project Title"} onChangeText={setTitle} value={title} className="my-2"></ThemedTextInput>
        <ThemedView className="flex-row bg-transparent">
          <ThemedButton size="small" disabled={isLoading} onPress={saveProject}>
            <ThemedText type="defaultSemiBold">{isLoading ? "Loading" : "Save Project"}</ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
      <AlertBox visible={error != ""} text={error} status={"error"} onClose={() => setError("")} />
    </PageWrapper>
  );
}
