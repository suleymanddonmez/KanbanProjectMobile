import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { PageHeader, PageHeaderType } from "./PageHeader";
import { PageLoader } from "./PageLoader";

interface PageWrapperType {
  pageHeaderProps: PageHeaderType;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
}

export function PageWrapper({ pageHeaderProps, isLoading, isRefreshing, onRefresh, children }: PageWrapperType) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PageHeader {...pageHeaderProps} />
        <ThemedView
          contentContainerStyle={styles.itemListContainer}
          isScrollable={true}
          refreshControl={<RefreshControl refreshing={isRefreshing || false} onRefresh={onRefresh} title={"Loading..."} />}
        >
          {isLoading ? <PageLoader visible={isLoading} /> : children}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  itemListContainer: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
});
