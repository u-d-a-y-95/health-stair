import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, ContextValue, UserData } from "./index.type";

const initValue = {
  isloading: true,
  data: {
    id: "",
    name: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    district: "",
    subdistrict: "",
    blood_group: "",
    deviceId: "",
    isSync: false,
  },
};

const STORAGE_NAME = "health-stair-beta-4";

const context = createContext<ContextValue>({
  ...initValue,
  updateAppData: () => {},
});

export function Provider(props: React.PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initValue);

  const loadContext = async () => {
    const data = await AsyncStorage.getItem(STORAGE_NAME);
    setAppState((state) => ({
      data: data ? JSON.parse(data).data : state.data,
      isloading: false,
    }));
  };

  const setDataInStorage = async (value: any) => {
    await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(value));
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

  const updateAppData = (data: UserData) => {
    setAppState((state) => ({
      ...state,
      data,
    }));
  };

  return (
    <context.Provider value={{ ...appState, updateAppData }}>
      {props.children}
    </context.Provider>
  );
}

export const useAppContext = () => {
  return useContext(context);
};
