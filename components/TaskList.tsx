import { router } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TaskListType, fetchApi } from "@/api/BaseAction";
import { Task } from "./Task";
import { ThemedButton } from "./ThemedButton";
import { useState } from "react";

interface TaskListPropsType {
  taskList: TaskListType;
  notDeletable: boolean;
  refreshProject: () => void;
  isLoading: boolean;
  setLoading: (val: boolean) => void;
}

export function TaskList({ taskList, notDeletable = false, refreshProject, isLoading, setLoading }: TaskListPropsType) {
  const { id, title, items } = taskList;

  const onPressNewTask = () => {
    router.navigate(`tasks/new/${id}`);
  };

  const deleteTaskList = async () => {
    if (notDeletable) {
      alert("This project is example project. The task list is not deletable! Please try in another project.");
      return;
    }
    setLoading(true);
    const response = await fetchApi<TaskListType>(`/api/taskLists/${id}`, "DELETE");
    if (response.success) {
      // refreshProject();
    } else {
      console.log(response.error);
      // alert("An error occurred!");
    }
    refreshProject();
  };

  return (
    <ThemedView className="p-4 rounded-xl mb-4" themeColorName="taskListBackground">
      <ThemedView className="flex-row justify-between items-center mb-4 bg-transparent">
        <ThemedView className="flex-row bg-transparent items-center justify-start gap-2">
          <ThemedText type="title">{title}</ThemedText>
          <ThemedButton
            size="small"
            onPress={deleteTaskList}
            style={{
              backgroundColor: "rgb(239,68,68)",
              marginLeft: 2,
              borderRadius: 50,
            }}
            disabled={isLoading}
          >
            <ThemedText type="defaultSemiBold" className="text-xs" themeColorName={"white"}>
              X
            </ThemedText>
          </ThemedButton>
        </ThemedView>
        <ThemedButton size="small" onPress={onPressNewTask} disabled={isLoading}>
          <ThemedText type="defaultSemiBold" themeColorName={"white"}>
            + New Task
          </ThemedText>
        </ThemedButton>
      </ThemedView>
      {items?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ThemedView>
  );
}
