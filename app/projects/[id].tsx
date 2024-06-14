import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { PageHeader } from "@/components/PageHeader";
import { ProjectType, fetchApi } from "@/api/BaseAction";
import TaskList from "@/components/TaskList";

const notDeleteableProjectId = "6666f966a149e14e2e550f39";
const defaultTaskLists = ["Backlog", "To do", "In progress", "Designed"];

export default function Project() {
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const projectId = id?.toString();
  const notDeletable = notDeleteableProjectId == id;

  useEffect(() => {
    getProject();
  }, [id]);

  const getProject = async () => {
    if (projectId) {
      setIsLoading(true);
      const response = await fetchApi<ProjectType>(`/api/projects/${projectId}`);
      if (response.success) {
        setProject(response.data);
      } else {
        console.log(response.error);
        alert("An error occurred!");
      }
      setIsLoading(false);
    }
  };

  const updateProject = async (project: ProjectType) => {
    if (projectId) {
      const response = await fetchApi<ProjectType>(`/api/projects/${id}`, "PATCH", {
        project: project,
      });
      if (response.success && response.data) {
        setProject(response.data);
      }
    }
  };

  const deleteProject = async () => {
    if (projectId) {
      if (notDeletable) {
        alert("This project is example project. It is not deletable! Please try in another project.");
        return;
      }
      const response = await fetchApi<ProjectType>(`/api/projects/${id}`, "DELETE");
      if (response.success) {
        router.push(`/`);
      } else {
        console.log(response.error);
        alert("An error occurred!");
      }
    }
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
        <ThemedView
          contentContainerStyle={styles.itemListContainer}
          isScrollable={true}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => getProject()} title={"Loading..."} />}
        >
          {project?.items?.map((taskList) => (
            <TaskList key={taskList.id} taskList={taskList} />
          ))}
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  itemListContainer: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
});
