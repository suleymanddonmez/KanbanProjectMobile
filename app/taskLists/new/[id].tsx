import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { TaskListType, fetchApi } from "@/api/BaseAction";
import { PageWrapper } from "@/components/PageWrapper";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { AlertBox } from "@/components/AlertBox";
import { PageLoader } from "@/components/PageLoader";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const projectId = id?.toString();

  const validateForm = () => {
    if (!title) {
      setError("Task List title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const saveTaskList = async () => {
    setIsLoading(true);
    if (validateForm()) {
      const response = await fetchApi<TaskListType>("/api/taskLists", "POST", {
        title: title,
        projectId: projectId,
      });
      if (response.success) {
        router.push(`/projects/${projectId}`);
      } else {
        setError(response.error || "An error occurred!");
      }
    }
    setIsLoading(false);
  };

  return (
    <PageWrapper
      pageHeaderProps={{
        title: "New Task List",
        headerActions: [
          {
            title: "All Projects",
            link: "/",
          },
          {
            title: "Return To Project",
            onPress: () => {
              router.back();
            },
          },
        ],
      }}
    >
      <PageLoader visible={isLoading} />
      <ThemedView className="p-4 rounded-xl mb-4" themeColorName="formBackground">
        <ThemedTextInput label={"Task List Title"} onChangeText={setTitle} value={title} className="my-2"></ThemedTextInput>
        <ThemedView className="flex-row justify-end bg-transparent mt-2">
          <ThemedButton disabled={isLoading} onPress={saveTaskList} color="success">
            <ThemedText type="defaultSemiBold" themeColorName={"white"}>
              {isLoading ? "Loading" : "Save Task List"}
            </ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
      <AlertBox visible={error != ""} text={error} status={"error"} onClose={() => setError("")} />
    </PageWrapper>
  );
}
