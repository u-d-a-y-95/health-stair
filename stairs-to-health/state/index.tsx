import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, ContextValue, UserData } from "./index.type";

const initValue = {
  isloading: true,
  isOnBoarded: false,
  data: {
    id: "",
    name: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    district: "",
    blood_group: "",
    deviceId: "",
    isSync: false,
  },
};

const context = createContext<ContextValue>({
  ...initValue,
  setOnboarding: () => {},
  setSync: () => {},
});

export function Provider(props: React.PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initValue);

  const loadContext = async () => {
    const data = await AsyncStorage.getItem("health-stair-beta-3");
    if (!data) {
      setAppState((state) => ({
        ...state,
        isloading: false,
        isOnBoarded: false,
      }));
    } else {
      const parsed = JSON.parse(data);
      setAppState({
        ...parsed,
        isloading: false,
      });
    }
  };

  const setDataInStorage = async (value: any) => {
    await AsyncStorage.setItem("health-stair", JSON.stringify(value));
  };

  const setOnboarding = (data: UserData) => {
    setAppState((state) => ({
      ...state,
      isOnBoarded: true,
      data: {
        ...data,
      },
    }));
  };
  const setSync = (value: boolean) => {
    setAppState((state) => ({
      ...state,
      isOnBoarded: true,
      data: {
        ...state.data,
        isSync: value,
      },
    }));
  };

  useEffect(() => {
    loadContext();
  }, []);

  useEffect(() => {
    setDataInStorage(appState);
  }, [appState]);

  return (
    <context.Provider value={{ ...appState, setOnboarding, setSync }}>
      {props.children}
    </context.Provider>
  );
}

export const useAppContext = () => {
  return useContext(context);
};
