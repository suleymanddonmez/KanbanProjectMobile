import { TouchableWithoutFeedback } from "react-native";
import { canOpenURL, openURL } from "expo-linking";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";

export interface PageHeaderType {
  title: string;
  deleteAction?: HeaderActionType;
  headerActions?: HeaderActionType[];
}

interface HeaderActionType {
  title: string;
  link?: string;
  onPress?: () => void;
  style?: Object;
}

export function PageHeader({ title, deleteAction, headerActions }: PageHeaderType) {
  const goToAuthorPage = async () => {
    let authorUrl = "https://www.linkedin.com/in/suleymanddonmez/";
    let isValidUrl = await canOpenURL(authorUrl);
    if (isValidUrl) {
      openURL(authorUrl);
    } else {
      alert("Invalid URL!");
    }
  };

  const onPressAction = (link: string) => {
    if (link) {
      router.navigate(link);
    }
  };

  return (
    <ThemedView className="p-4 flex-row justify-between items-center">
      <ThemedView>
        <ThemedView className="flex-row items-center justify-center">
          <ThemedText type="title">{title}</ThemedText>
          {deleteAction && (
            <ThemedButton size="small" onPress={deleteAction.onPress} style={deleteAction.style}>
              <ThemedText type="defaultSemiBold" className="text-xs" themeColorName={"white"}>
                {deleteAction.title}
              </ThemedText>
            </ThemedButton>
          )}
        </ThemedView>

        <TouchableWithoutFeedback onPress={goToAuthorPage}>
          <ThemedText type="link">by Süleyman Dönmez</ThemedText>
        </TouchableWithoutFeedback>
      </ThemedView>
      <ThemedView className="gap-1">
        {headerActions?.length &&
          headerActions.map((headerAction, index) => (
            <ThemedButton
              key={index}
              size="small"
              onPress={() => (headerAction.link ? onPressAction(headerAction.link) : headerAction.onPress?.())}
              style={headerAction.style}
            >
              <ThemedText type="defaultSemiBold" themeColorName={"white"}>
                {headerAction.title}
              </ThemedText>
            </ThemedButton>
          ))}
      </ThemedView>
    </ThemedView>
  );
}
