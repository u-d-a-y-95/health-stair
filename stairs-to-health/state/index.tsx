import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// This hook can be used to access the user info.
const context = createContext({
  isloading: true,
  isOnBoarded: false,
  data: {},
});

export function Provider(props: React.PropsWithChildren) {
  const [appState, setAppState] = useState({
    isloading: true,
    isOnBoarded: false,
    data: {},
  });

  const loadContext = async () => {
    const data = await AsyncStorage.getItem("health-stair");
    if (!data) {
      setAppState({
        isloading: false,
        isOnBoarded: false,
        data: {},
      });
    } else {
      const parsed = JSON.parse(data);
      setAppState(parsed);
    }
  };

  const setDataInStorage = async (value: any) => {
    await AsyncStorage.setItem("health-stair", JSON.stringify(value));
  };

  const setOnboarding = (data) => {
    setAppState((state) => ({
      ...state,
      isOnBoarded: true,
      data: {
        ...state.data,
        info: {
          data,
          isSync: false,
        },
      },
    }));
  };
  const setTracker = (data) => {
    setAppState((state) => ({
      ...state,
      isOnBoarded: true,
      data: {
        ...state.data,
        tracker: data,
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
    <context.Provider value={{ ...appState, setOnboarding, setTracker }}>
      {props.children}
    </context.Provider>
  );
}

export const useAppContext = () => {
  return useContext(context);
};
