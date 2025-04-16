import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

export function CyanGlowButton({
  event,
  icon,
  title,
  styles,
}: {
  event: () => void;
  icon?: Boolean;
  title: string;
  styles?: ViewStyle;
}) {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 20],
    }),
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0.9],
    }),
    elevation: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [6, 12],
    }),
  };

  return (
    // @ts-ignore
    <TouchableParent onPress={event} style={[styles, animatedStyle]}>
      {/* @ts-ignore */}
      <CyanParent>
        {icon && <CyanIconImage source={require("@assets/icons/stars.png")} />}
        <Title>{title}</Title>
      </CyanParent>
    </TouchableParent>
  );
}
const TouchableParent = styled(TouchableOpacity)`
  width: 90%;
  height: 50px;
  margin: 20px 0px 10px 0px;
  shadow-color: #73c9f4;
`;
const CyanParent = styled(LinearGradient).attrs({
  colors: ["#94FAF4", "#73C9F4", "#6FC4F4", "#579FF5"],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  border-radius: 50px;
`;
const Title = styled(Text)`
  font-weight: 700;
  font-size: 20px;
  color: #d5e4f7;
`;
const CyanIconImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
