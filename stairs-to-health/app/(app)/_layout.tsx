import { Redirect, SplashScreen, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ms } from "@/utils/sizes";
import { useFonts } from "expo-font";
import { useAppContext } from "@/state";
import { useAppTheme } from "@/hooks/useAppTheme";
import NetInfo from "@react-native-community/netinfo";
import { saveData } from "@/screens/settings/profile/util";
import { ToastAndroid } from "react-native";

export default function TabLayout() {
  const { Colors } = useAppTheme();
  const { isloading, isOnBoarded, data, setOnboarding } = useAppContext();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && !loaded && isOnBoarded) {
        if (!data.isSync) {
          saveData(data, setOnboarding, () => {});
        }
      }
    });
    return () => unsubscribe();
  }, [loaded, isOnBoarded]);

  if (!loaded || isloading) {
    return null;
  }

  if (loaded && !isOnBoarded) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "ড্যাশবোর্ড",
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={ms(22)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        listeners={({ navigation, route, ...rest }) => ({
          tabPress: (e) => {
            navigation.navigate("education", { screen: "index" });
          },
        })}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={ms(22)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pregnancyCalculator"
        listeners={({ navigation, route, ...rest }) => ({
          tabPress: (e) => {
            navigation.navigate("pregnancyCalculator", { screen: "index" });
          },
        })}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={ms(22)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clinic"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "business" : "business-outline"}
              size={ms(22)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={ms(22)}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
