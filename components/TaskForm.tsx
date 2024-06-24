import { useState } from "react";
import { TaskType } from "@/api/BaseAction";
import { PageWrapper } from "./PageWrapper";
import { PageLoader } from "./PageLoader";
import { ThemedView } from "./ThemedView";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { AlertBox } from "./AlertBox";
import { ThemedSelectInput } from "./ThemedSelectInput";

interface TaskFormPropsType {
  taskInfo: TaskType;
  onSave: Function;
  onDelete?: Function;
  isLoading: boolean;
}

interface SelectType {
  text: string;
  value: string;
}

const colors: SelectType[] = [
  {
    text: "Red",
    value: "red-500",
  },
  {
    text: "Blue",
    value: "blue-500",
  },
  {
    text: "Indigo",
    value: "indigo-400",
  },
  {
    text: "Emerald",
    value: "emerald-500",
  },
  {
    text: "Purple",
    value: "purple-500",
  },
];

const categories: SelectType[] = [
  {
    text: "Formatting",
    value: "Formatting",
  },
  {
    text: "Note interface",
    value: "Note interface",
  },
  {
    text: "New note",
    value: "New note",
  },
];

export function TaskForm({ taskInfo, onSave, onDelete, isLoading }: TaskFormPropsType) {
  const [title, setTitle] = useState<string>(taskInfo.title || "");
  const [description, setDescription] = useState<string>(taskInfo.description || "");
  const [tags, setTags] = useState<string[]>(taskInfo.tags || []);
  const [color, setColor] = useState<string>(taskInfo.color || "red-500");
  const [error, setError] = useState("");
  const { taskListId } = taskInfo;

  const validateForm = () => {
    if (!title) {
      setError("Task title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        title,
        description,
        tags,
        color,
        taskListId,
      });
    }
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <>
      <ThemedView className="p-4 rounded-xl mb-4" darkColor="rgb(38,38,38)">
        <ThemedTextInput label={"Task Title"} onChangeText={setTitle} value={title} className="my-2" />
        <ThemedTextInput label={"Task Description"} onChangeText={setDescription} value={description} className="my-2" type="textarea" />
        {/* <ThemedSelectList label={"Task Color"} setSelected={(val: string) => setColor(val)} data={colors} save="value" /> */}
        <ThemedSelectInput />
        <ThemedView className="flex-row bg-transparent">
          <ThemedButton size="small" disabled={isLoading} onPress={handleSave}>
            <ThemedText type="defaultSemiBold">{isLoading ? "Loading" : "Save Task"}</ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
      <AlertBox visible={error != ""} text={error} status={"error"} onClose={() => setError("")} />
    </>
  );
}
