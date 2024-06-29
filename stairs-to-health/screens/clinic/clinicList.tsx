import { FlashList } from "@shopify/flash-list";
import { ClinicListItem } from "./components/clinicListItem";
import { USpace } from "@/components/uComponents/uSpace";
import { clinics } from "@/data/clinic";
import { SafeScreen } from "@/components/safeScreen";
import { View } from "react-native";
import { ms, ws } from "@/utils/sizes";
import { ClinicDataProps } from "./index.type";

export const ClinicList = ({
  list,
  parentId,
}: {
  list: ClinicDataProps[];
  parentId: number;
}) => {
  return (
    <SafeScreen>
      <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
        <FlashList
          data={list}
          renderItem={({ item }) => (
            <ClinicListItem
              {...item}
              url={`/clinic/details/${parentId}:${item.id}`}
            />
          )}
          ItemSeparatorComponent={() => <USpace size={20} />}
          ListHeaderComponent={() => <USpace size={10} />}
          ListFooterComponent={() => <USpace size={10} />}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeScreen>
  );
};
