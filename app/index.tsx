import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, RefreshControl } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { PageHeader } from "@/components/PageHeader";
import { ProjectType, fetchApi } from "@/api/BaseAction";

export default function Index() {
  const [projects, setProjects] = useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setIsLoading(true);
    const response = await fetchApi<ProjectType[]>("/api/projects");
    if (response.success) {
      setProjects(response.data);
    } else {
      console.log(response.error);
      alert("An error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PageHeader
          title={"All Projects"}
          headerAction={{
            title: "+ New Project",
            link: "/projects/new",
          }}
        />
        <ThemedView
          contentContainerStyle={styles.itemListContainer}
          isScrollable={true}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getProjects} title={"Loading..."} />}
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
              <ThemedButton key={project.id} style={styles.projectButton}>
                <ThemedText type="defaultSemiBold" style={styles.projectButtonText}>
                  {project.title}
                </ThemedText>
              </ThemedButton>
            </Link>
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
  itemListContainer: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
  projectButton: {
    width: "100%",
    backgroundColor: "rgb(38,38,38)",
  },
  projectButtonText: {
    textAlign: "center",
  },
});
