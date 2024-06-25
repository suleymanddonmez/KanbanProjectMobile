import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ProjectType, fetchApi } from "@/api/BaseAction";
import { TaskList } from "@/components/TaskList";
import { PageWrapper } from "@/components/PageWrapper";

const notDeleteableProjectId = "6666f966a149e14e2e550f39";
const defaultTaskLists = ["Backlog", "To do", "In progress", "Designed"];

export default function Project() {
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { id } = useLocalSearchParams();
  const projectId = id?.toString();
  const notDeletable = notDeleteableProjectId == id;

  useEffect(() => {
    getProject();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      getProject();
    }, [])
  );

  const getProject = async (isRefresh?: boolean) => {
    if (projectId) {
      setLoading(true, isRefresh);
      const response = await fetchApi<ProjectType>(`/api/projects/${projectId}`);
      if (response.success) {
        setProject(response.data);
      } else {
        console.log(response.error);
        // alert("An error occurred!");
      }
      setLoading(false, isRefresh);
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
      setLoading(true, true);
      const response = await fetchApi<ProjectType>(`/api/projects/${id}`, "DELETE");
      if (response.success) {
        router.replace("/");
      } else {
        console.log(response.error);
        // alert("An error occurred!");
      }
      setLoading(false, true);
    }
  };

  const setLoading = (value: boolean, isRefresh?: boolean) => {
    if (isRefresh) {
      setIsRefreshing(value);
    } else {
      setIsLoading(value);
    }
  };

  return (
    <PageWrapper
      pageHeaderProps={{
        title: `${project?.title || "Project Details"}`,
        deleteAction: {
          title: "X",
          onPress: () => deleteProject(),
          style: {
            backgroundColor: "rgb(239,68,68)",
            marginLeft: 2,
            borderRadius: 50,
          },
        },
        headerActions: [
          {
            title: "All Projects",
            link: "/",
          },
          {
            title: "New Task List",
            link: `/taskLists/new/${projectId}`,
          },
        ],
      }}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={() => getProject(true)}
    >
      {project?.items?.length ? (
        project.items.map((taskList) => (
          <TaskList
            key={taskList.id}
            taskList={taskList}
            notDeletable={notDeletable && defaultTaskLists.indexOf(taskList.title) > -1}
            refreshProject={() => getProject(true)}
            isLoading={isRefreshing}
            setLoading={(val) => setLoading(val, true)}
          />
        ))
      ) : (
        <ThemedText type="subtitle">There is no TaskList in this project!</ThemedText>
      )}
    </PageWrapper>
  );
}
