import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const ws = (size: number) => (width / guidelineBaseWidth) * size;
export const hs = (size: number) => (height / guidelineBaseHeight) * size;
export const ms = (size: number, factor: number = 0.5) =>
  size + (ws(size) - size) * factor;
