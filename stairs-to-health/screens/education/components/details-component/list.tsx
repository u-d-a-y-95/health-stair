import { UText } from "@/components/uComponents/uText";
import { StyleSheet, View } from "react-native";
import { ListComponentProps } from "./index.type";
import { hs, ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";

const listType = {
  1: {
    borderRadius: 1000,
  },
  2: {},
};

const List = ({ items, layer = 1 }: { items: ListComponentProps[] }) => {
  const { Colors } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          ...(layer > 1 && { marginLeft: ws(20) }),
        },
      ]}
    >
      {items.map((item, index) => (
        <View style={{ marginTop: hs(8) }} key={index}>
          <View style={[styles.main]}>
            <View
              style={[
                styles.bullet,
                listType[layer],
                { backgroundColor: Colors.text },
              ]}
            />
            <View style={{ flex: 1 }}>
              <UText
                align="justify"
                size="sm"
                styles={{ flex: 1 }}
                weight={item?.isTitleBold ? "600" : ""}
              >
                {item.title}
              </UText>
              {item.subtitle && (
                <>
                  {item.subtitle.map((sub, index) => (
                    <UText
                      key={index}
                      align="justify"
                      size="sm"
                      styles={{ flex: 1, marginTop: hs(7) }}
                    >
                      {sub}
                    </UText>
                  ))}
                </>
              )}
            </View>
          </View>
          {item?.children && <List items={item?.children} layer={layer + 1} />}
        </View>
      ))}
    </View>
  );
};
export const ListComponent = ({
  title,
  children,
  subtitle = "",
}: ListComponentProps) => {
  return (
    <View>
      {title && <UText weight="600">{title}</UText>}
      {subtitle && (
        <UText size="sm" align="justify" styles={{ marginTop: hs(7) }}>
          {subtitle}
        </UText>
      )}
      {children && <List items={children} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: ws(10),
    flex: 1,
  },
  main: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ws(8),
  },
  bullet: {
    width: ws(7),
    height: ws(7),
    marginTop: 7,
  },
});
