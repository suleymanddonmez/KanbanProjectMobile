import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
        <Stack.Screen name="projects/new" options={{ headerShown: false, title: "New Project" }} />
        <Stack.Screen name="projects/[id]" options={{ headerShown: false, title: "Project Detail" }} />
        <Stack.Screen name="taskLists/new/[id]" options={{ headerShown: false, title: "New Task List" }} />
        <Stack.Screen name="tasks/new/[id]" options={{ headerShown: false, title: "New Task" }} />
        <Stack.Screen name="tasks/[id]" options={{ headerShown: false, title: "Task Edit" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
