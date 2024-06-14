import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TaskType } from "@/api/BaseAction";

interface TaskPropsType {
  task: TaskType;
}

export default function Task({ task }: TaskPropsType) {
  return (
    <ThemedView style={styles.container}>
      <Link style={styles.editButton} className={`${task.color ? "bg-" + task.color : "bg-indigo-400"}`} href={`/tasks/${task.id}`} asChild>
        <ThemedText type="link">Edit</ThemedText>
      </Link>
      <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
      {task.description && <ThemedText>{task.description}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "rgb(99,102,241)",
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    marginLeft: 2,
    right: 10,
    top: 2,
  },
  editButtonText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
