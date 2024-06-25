import { useState } from "react";
import { TaskType } from "@/api/BaseAction";
import { PageWrapper } from "./PageWrapper";
import { PageLoader } from "./PageLoader";
import { ThemedView } from "./ThemedView";
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { AlertBox } from "./AlertBox";
import { SelectType, ThemedSelectInput } from "./ThemedSelectInput";

interface TaskFormPropsType {
  taskInfo: TaskType;
  onSave: Function;
  onDelete?: Function;
  isLoading: boolean;
}

const colors: SelectType[] = [
  {
    label: "Red",
    value: "red-500",
  },
  {
    label: "Blue",
    value: "blue-500",
  },
  {
    label: "Indigo",
    value: "indigo-400",
  },
  {
    label: "Emerald",
    value: "emerald-500",
  },
  {
    label: "Purple",
    value: "purple-500",
  },
];

const categories: SelectType[] = [
  {
    label: "Formatting",
    value: "Formatting",
  },
  {
    label: "Note interface",
    value: "Note interface",
  },
  {
    label: "New note",
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
        <ThemedTextInput label={"Task Title"} onChangeText={setTitle} value={title} />
        <ThemedTextInput label={"Task Description"} onChangeText={setDescription} value={description} type="textarea" />
        <ThemedSelectInput label={"Task Color"} onChangeValue={setColor} value={color} items={colors} />
        <ThemedSelectInput label={"Task Tags"} onChangeValue={setTags} value={tags} items={categories} multiple />
        <ThemedView className={`flex-row justify-${onDelete ? "between" : "end"} bg-transparent mt-2`}>
          {onDelete && (
            <ThemedButton disabled={isLoading} onPress={handleSave} color={"error"}>
              <ThemedText type="defaultSemiBold">{isLoading ? "Loading" : "Delete Task"}</ThemedText>
            </ThemedButton>
          )}
          <ThemedButton disabled={isLoading} onPress={handleSave} color="success">
            <ThemedText type="defaultSemiBold">{isLoading ? "Loading" : "Save Task"}</ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
      <AlertBox visible={error != ""} text={error} status={"error"} onClose={() => setError("")} />
    </>
  );
}
