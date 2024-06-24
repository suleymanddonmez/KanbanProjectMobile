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
        <ThemedText type="link">Edit</ThemedText>
      </Link>
      <ThemedText type="defaultSemiBold">{task.title}</ThemedText>
      {task.description && <ThemedText className="mt-2">{task.description}</ThemedText>}
      {task.tags.length > 0 && <TaskTags tags={task.tags} />}
    </ThemedView>
  );
}

interface TaskTagsPropsType {
  tags: string[];
}

function TaskTags({ tags }: TaskTagsPropsType) {
  return (
    <>
      {tags.length > 0 && (
        <>
          {tags.map((tag, index) => (
            <ThemedText key={`tag_${index}`} type="link" className="text-sm px-2 py-1">
              {tag}
            </ThemedText>
          ))}
        </>
      )}
    </>
  );
}

export default Task;
