import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, ContextValue } from "./index.type";

const initValue = {
  isloading: true,
};

const STORAGE_NAME = "health-stair-app";

const context = createContext<ContextValue>({
  ...initValue,
});

export function Provider(props: React.PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>(initValue);

  const loadContext = async () => {
    setAppState(() => ({
      isloading: false,
    }));
  };

  const setDataInStorage = async (value: any) => {
    await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(value));
  };

  useEffect(() => {
    loadContext();
  }, []);

  useEffect(() => {
    setDataInStorage(appState);
  }, [appState]);

  return (
    <context.Provider value={{ ...appState }}>
      {props.children}
    </context.Provider>
  );
}

export const useAppContext = () => {
  return useContext(context);
};
