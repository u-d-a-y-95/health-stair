import { UButton } from "@/components/uComponents/uButton";
import { Image, Pressable, View } from "react-native";
import * as Linking from "expo-linking";
import { QRCodeProps } from "../index.type";
import { ws } from "@/utils/sizes";

export const QRCode = ({ imageUrl, url = "", label }: QRCodeProps) => {
  const onPressHandler = () => {
    if (!url) return;
    Linking.openURL(url);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <Image
        style={{ width: ws(150), height: ws(150) }}
        source={imageUrl}
        resizeMode="contain"
      />
      {/* <UButton
        type="outline"
        size="lg"
        onPress={onPressHandler}
        styles={{
          base: {
            marginTop: hs(10),
          },
        }}
      >
        {label}
      </UButton> */}
    </Pressable>
  );
};
