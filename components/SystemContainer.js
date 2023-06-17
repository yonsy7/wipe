import React, { useMemo } from "react";
import { StatusBar, StyleSheet } from "react-native";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SystemContainer = ({
  timeAlignSelf,
  timeWidth,
  timePosition,
  timeTop,
  timeLeft,
}) => {
  const systemDarkStatusBarStyle = useMemo(() => {
    return {
      ...getStyleValue("alignSelf", timeAlignSelf),
      ...getStyleValue("width", timeWidth),
      ...getStyleValue("position", timePosition),
      ...getStyleValue("top", timeTop),
      ...getStyleValue("left", timeLeft),
    };
  }, [timeAlignSelf, timeWidth, timePosition, timeTop, timeLeft]);

  return <StatusBar barStyle="default" />;
};

const styles = StyleSheet.create({});

export default SystemContainer;
