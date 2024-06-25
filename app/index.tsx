import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ProjectType, fetchApi } from "@/api/BaseAction";
import { PageWrapper } from "@/components/PageWrapper";

export default function Index() {
  const [projects, setProjects] = useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProjects();
    }, [])
  );

  const getProjects = async (isRefresh?: boolean) => {
    setLoading(true, isRefresh);
    const response = await fetchApi<ProjectType[]>("/api/projects");
    if (response.success) {
      setProjects(response.data);
    } else {
      console.log(response.error);
      alert("An error occurred!");
    }
    setLoading(false, isRefresh);
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
        title: "All Projects",
        headerActions: [
          {
            title: "+ New Project",
            link: "/projects/new",
          },
        ],
      }}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={() => getProjects(true)}
    >
      {projects?.map((project) => (
        <Link
          key={project.id}
          href={{
            pathname: "/projects/[id]",
            params: { id: project.id },
          }}
          asChild
        >
          <ThemedButton key={project.id} style={styles.projectButton} color="default">
            <ThemedText type="defaultSemiBold" style={styles.projectButtonText}>
              {project.title}
            </ThemedText>
          </ThemedButton>
        </Link>
      ))}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  projectButton: {
    width: "100%",
  },
  projectButtonText: {
    textAlign: "center",
  },
});
