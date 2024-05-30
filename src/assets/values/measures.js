import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_HEIGHT_WS = Dimensions.get("screen").height;

const BORDER_RADIUS = 10;

const measures = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BORDER_RADIUS,
  SCREEN_HEIGHT_WS,
};

export default measures;
