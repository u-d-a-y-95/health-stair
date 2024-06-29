import { hs, ws } from "@/utils/sizes";
import { Image, View } from "react-native";
import { ImageComponentProps } from "./index.type";
import { UText } from "@/components/uComponents/uText";

export const ImageComponent = ({
  url,
  title,
  imageText,
}: ImageComponentProps) => {
  return (
    <View style={{ height: ws(300) }}>
      {title && (
        <UText size="lg" weight="bold" styles={[{ marginBottom: hs(10) }]}>
          {title}
        </UText>
      )}

      <Image
        source={url}
        alt="dummy"
        style={{
          width: "100%",
          flex: 1,
          borderRadius: 10,
        }}
        resizeMode="stretch"
      />
      {imageText && (
        <UText
          weight="semibold"
          styles={[{ textAlign: "center", marginTop: hs(6) }]}
        >
          {imageText}
        </UText>
      )}
    </View>
  );
};
