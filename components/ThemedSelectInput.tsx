import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export type ThemedSelectInputProps = {
  label: string;
  lightColor?: string;
  darkColor?: string;
  value: string | string[];
  items: SelectType[];
  onChangeValue: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
};

export interface SelectType {
  label: string;
  value: string;
}

export function ThemedSelectInput({ label, value, items, onChangeValue, multiple = false, lightColor, darkColor, ...rest }: ThemedSelectInputProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const [open, setOpen] = useState(false);

  const getMultipleText = () => {
    let selectedItems = items.filter((i) => value.includes(i.value));
    return selectedItems.map((i) => i.label).join(", ");
  };

  return (
    <ThemedView className="bg-transparent my-2">
      <ThemedText type="defaultSemiBold" className="mb-2 ml-1">
        {label}
      </ThemedText>
      {multiple ? (
        <DropDownPicker
          value={Array.isArray(value) ? value : []}
          multiple={multiple}
          multipleText={getMultipleText()}
          open={open}
          setOpen={setOpen}
          items={items}
          setValue={onChangeValue}
          language={"EN"}
          theme={colorScheme === "dark" ? "DARK" : "LIGHT"}
          style={{
            backgroundColor: backgroundColor,
            marginTop: 2,
            marginBottom: 2,
          }}
          labelStyle={{
            color: color,
          }}
          flatListProps={{
            style: {
              backgroundColor: backgroundColor,
            },
          }}
          {...rest}
          listMode="MODAL"
          modalTitle={label}
          modalAnimationType="slide"
          modalContentContainerStyle={{
            backgroundColor: backgroundColor,
          }}
          placeholder=""
        />
      ) : (
        <DropDownPicker
          value={typeof value === "string" ? value : ""}
          open={open}
          setOpen={setOpen}
          items={items}
          setValue={onChangeValue}
          language={"EN"}
          theme={colorScheme === "dark" ? "DARK" : "LIGHT"}
          style={{
            backgroundColor: backgroundColor,
            marginTop: 2,
            marginBottom: 2,
          }}
          labelStyle={{
            color: color,
          }}
          flatListProps={{
            style: {
              backgroundColor: backgroundColor,
            },
          }}
          {...rest}
          listMode="MODAL"
          modalTitle={label}
          modalAnimationType="slide"
          modalContentContainerStyle={{
            backgroundColor: backgroundColor,
          }}
          placeholder=""
        />
      )}
    </ThemedView>
  );
}
