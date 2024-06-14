import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TaskListType } from "@/api/BaseAction";
import Task from "./Task";
import { ThemedButton } from "./ThemedButton";

interface TaskListPropsType {
  taskList: TaskListType;
}

export default function TaskList({ taskList }: TaskListPropsType) {
  const { id, title, items } = taskList;
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <Link href={`tasks/new/${id}`} asChild>
          <ThemedButton>
            <ThemedText type="defaultSemiBold">+ New Task</ThemedText>
          </ThemedButton>
        </Link>
      </ThemedView>
      {items?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "rgb(38,38,38)",
    borderRadius: 10,
    marginBottom: 4,
    position: "relative",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 15,
  },
  editButton: {
    position: "absolute",
    marginLeft: 2,
    right: 2,
    top: 2,
  },
  editButtonText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
