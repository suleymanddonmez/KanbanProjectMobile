import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ProjectType, TaskType, fetchApi } from "@/api/BaseAction";
import { PageWrapper } from "@/components/PageWrapper";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { AlertBox } from "@/components/AlertBox";
import { PageLoader } from "@/components/PageLoader";
import { TaskForm } from "@/components/TaskForm";

export default function NewTask() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const taskListId = id?.toString();

  const saveTask = async (taskInfo: TaskType) => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>("/api/tasks", "POST", {
      title: taskInfo.title,
      description: taskInfo.description,
      tags: taskInfo.tags,
      color: taskInfo.color,
      taskListId: taskListId,
    });
    if (response.success) {
      router.back();
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <PageWrapper
      pageHeaderProps={{
        title: "New Task",
        headerActions: [
          {
            title: "All Projects",
            link: "/",
          },
        ],
      }}
    >
      <PageLoader visible={isLoading} />
      {taskListId ? (
        <TaskForm
          taskInfo={{ id: "new", title: "", description: "", tags: [], color: "red-500", taskListId: taskListId }}
          onSave={saveTask}
          isLoading={isLoading}
        />
      ) : (
        <ThemedText type="subtitle">Task List id required!</ThemedText>
      )}
    </PageWrapper>
  );
}
