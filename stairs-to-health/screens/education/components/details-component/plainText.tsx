import { UText } from "@/components/uComponents/uText";
import { hs, ws } from "@/utils/sizes";
import { View } from "react-native";
import { PlainTextComponentProps } from "./index.type";

export const PlainTextComponent = ({
  title,
  description,
}: PlainTextComponentProps) => {
  return (
    <View style={{ gap: hs(6) }}>
      {title && <UText weight="600">{title}</UText>}
      <View style={{}}>
        {description &&
          description.map((item, index) => (
            <UText
              key={index}
              align="justify"
              size="sm"
              styles={{
                flex: 1,
              }}
            >
              {item}
            </UText>
          ))}
      </View>
    </View>
  );
};
