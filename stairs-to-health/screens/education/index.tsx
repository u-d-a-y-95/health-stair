import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { EducationListItem } from "./components/educationListItem";
import { SafeScreen } from "@/components/safeScreen";
import { USpace } from "@/components/uComponents/uSpace";
import { educationList } from "@/data/education";
import { ws } from "@/utils/sizes";

export const Education = () => {
  return (
    <SafeScreen>
      <View style={{ flex: 1, paddingHorizontal: ws(10) }}>
        <FlashList
          data={educationList}
          renderItem={({ item }) => <EducationListItem {...item} />}
          ItemSeparatorComponent={() => <USpace size={10}></USpace>}
          ListFooterComponent={() => <View style={[{ height: 10 }]}></View>}
          ListHeaderComponent={() => <View style={[{ height: 10 }]}></View>}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
};
