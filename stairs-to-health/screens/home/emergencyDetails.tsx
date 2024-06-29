import { ScrollView, View } from "react-native";
import { hs, ws } from "@/utils/sizes";
import { SafeScreen } from "@/components/safeScreen";
import { getComponent } from "@/utils";
import { EmergencyContent } from "@/data/emergency";

export default function EmergencyDetail({ id }: { id: number }) {
  const data = EmergencyContent.subcategories[id].details;

  return (
    <SafeScreen styles={{ backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: hs(10), padding: ws(10) }}>
          {data.map((item, indx) => {
            const Component = getComponent(item.type);
            return <Component {...item} key={indx} />;
          })}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
