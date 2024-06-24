import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";

export type ThemedSelectInputProps = DropDownPickerProps<string> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSelectInput({ lightColor, darkColor, ...rest }: ThemedSelectInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{
        backgroundColor: backgroundColor,
      }}
      flatListProps={{
        style: {
          backgroundColor: "red",
        },
      }}
      language="EN"
      
    />
  );
}
