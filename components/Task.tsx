import React from "react";
import { Link } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { TaskType } from "@/api/BaseAction";

interface TaskPropsType {
  task: TaskType;
}

export function Task({ task }: TaskPropsType) {
  return (
    <ThemedView className={`p-3 ${task.color ? "bg-" + task.color : "bg-indigo-400"} mb-4 rounded-lg task-item relative`}>
      <Link className="absolute text-xs ml-2 right-2 top-1 cursor-pointer" href={`/tasks/${task.id}`} asChild>
        <ThemedText type="link" themeColorName={"white"}>
          Edit
        </ThemedText>
      </Link>
      <Link className="cursor-pointer" href={`/tasks/${task.id}`} asChild>
        <ThemedText type="defaultSemiBold" themeColorName={"white"}>
          {task.title}
        </ThemedText>
      </Link>
      {task.description && (
        <ThemedText className="mt-2" themeColorName={"white"}>
          {task.description}
        </ThemedText>
      )}
      {task.tags.length > 0 && <TaskTags tags={task.tags} />}
    </ThemedView>
  );
}

interface TaskTagsPropsType {
  tags: string[];
}

function TaskTags({ tags }: TaskTagsPropsType) {
  let selectedTags = tags.length > 0 ? tags.join(", ") : null;
  return (
    <>
      {selectedTags && (
        <ThemedText type="link" className="text-sm py-1" themeColorName={"white"}>
          {selectedTags}
        </ThemedText>
      )}
    </>
  );
}

export default Task;
