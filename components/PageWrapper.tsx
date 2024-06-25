import { RefreshControl, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { PageHeader, PageHeaderType } from "./PageHeader";
import { PageLoader } from "./PageLoader";
import { MainWrapper } from "./MainWrapper";

interface PageWrapperType {
  pageHeaderProps: PageHeaderType;
  isLoading?: boolean;
  isRefreshing?: boolean;
  disableScroll?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
}

export function PageWrapper({ pageHeaderProps, isLoading, disableScroll, isRefreshing, onRefresh, children }: PageWrapperType) {
  return (
    <ThemedView style={styles.container}>
      <MainWrapper>
        <PageHeader {...pageHeaderProps} />
        <ThemedView
          contentContainerStyle={styles.itemListContainer}
          isScrollable={disableScroll ? false : true}
          refreshControl={<RefreshControl refreshing={isRefreshing || false} onRefresh={onRefresh} title={"Loading..."} />}
        >
          {isLoading ? <PageLoader visible={isLoading} /> : children}
        </ThemedView>
      </MainWrapper>
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
