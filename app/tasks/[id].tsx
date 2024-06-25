import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { TaskType, fetchApi } from "@/api/BaseAction";
import { PageWrapper } from "@/components/PageWrapper";
import { AlertBox } from "@/components/AlertBox";
import { PageLoader } from "@/components/PageLoader";
import { TaskForm } from "@/components/TaskForm";

export default function Task() {
  const [task, setTask] = useState<TaskType>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const taskId = id?.toString();

  useEffect(() => {
    if (taskId) {
      getTask?.();
    }
  }, [taskId]);

  useFocusEffect(
    useCallback(() => {
      getTask();
    }, [])
  );

  const saveTask = async (taskInfo: TaskType) => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`, "PATCH", {
      task: { ...task, ...taskInfo },
    });
    if (response.success) {
      router.back();
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  const getTask = async () => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`);
    if (response.success && response.data) {
      setTask(response.data);
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  const delTask = async () => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`, "DELETE");
    if (response.success && response.data) {
      router.back();
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <PageWrapper
      pageHeaderProps={{
        title: "Task Edit",
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
      {taskId && task && <TaskForm taskInfo={task} onSave={saveTask} onDelete={delTask} isLoading={isLoading} />}
      <AlertBox visible={error != ""} text={error} status={"error"} onClose={() => setError("")} />
    </PageWrapper>
  );
}
