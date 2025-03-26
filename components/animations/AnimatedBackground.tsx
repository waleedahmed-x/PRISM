import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const BackgroundImage = styled(Animated.Image)`
  position: absolute;
  left: 0px;
  z-index: -1;
  width: 100%;
`;

const AnimatedBackground = () => {
  const topPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(topPosition, {
          toValue: 90,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(topPosition, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [topPosition]);

  return (
    <BackgroundImage
      source={require("@assets/images/vector-bg.png")}
      style={{
        top: topPosition.interpolate({
          inputRange: [0, 90],
          outputRange: ["0%", "80%"],
        }),
      }}
      resizeMode="cover"
    />
  );
};

export default AnimatedBackground;
