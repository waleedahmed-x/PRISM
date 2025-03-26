import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";

export function PurpleThemeButton({
  event,
  title,
  disabled = false,
  styles,
  icon,
}: {
  event: () => void;
  title: string;
  disabled?: boolean;
  styles?: any;
  icon?: boolean;
}) {
  const starletTopAnim = useRef(new Animated.Value(-250)).current;
  const starletBottomAnim = useRef(new Animated.Value(250)).current;

  useEffect(() => {
    const animateStarlets = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starletTopAnim, {
            toValue: 350,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(starletTopAnim, {
            toValue: -350,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(starletBottomAnim, {
            toValue: -350,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(starletBottomAnim, {
            toValue: 350,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateStarlets();
  }, [starletTopAnim, starletBottomAnim]);

  return (
    <OverflowHandler onPress={event} disabled={disabled}>
      {/* @ts-ignore */}
      <PurpleButton style={styles}>
        <AnimatedStarletTop
          source={require("@assets/icons/starlet-right.png")}
          style={{ transform: [{ translateX: starletTopAnim }] }}
        />
        {icon && <Image source={require("@assets/icons/stars.png")} />}
        <ButtonText disabled={disabled}>{title}</ButtonText>
        <AnimatedStarletBottom
          source={require("@assets/icons/starlet-left.png")}
          style={{ transform: [{ translateX: starletBottomAnim }] }}
        />
      </PurpleButton>
    </OverflowHandler>
  );
}
const OverflowHandler = styled(TouchableOpacity)`
  border-radius: 25px;
  overflow: hidden;
  width: 90%;
`;
const PurpleButton = styled(LinearGradient).attrs({
  colors: ["#111024", "#373280"],
  start: { x: 0.3, y: 0.5 },
  end: { x: 1, y: 0 },
})`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
  background-color: #714dffbc;
  border: 1px solid #8466fa89;
  overflow: hidden;
  border-radius: 25px;
`;

const AnimatedStarletTop = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: -13px;
  left: 0px;
  height: 25px;
  width: 150px;
`;

const AnimatedStarletBottom = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  bottom: -15px;
  right: 0px;
  height: 25px;
  width: 150px;
`;

export function RedThemeButton({
  title,
  event,
  disabled = false,
  icon,
}: {
  title: string;
  event: () => void;
  disabled?: boolean;
  icon?: boolean;
}) {
  const starletTopAnim = useRef(new Animated.Value(-250)).current;
  const starletBottomAnim = useRef(new Animated.Value(250)).current;

  useEffect(() => {
    const animateStarlets = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starletTopAnim, {
            toValue: 350,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(starletTopAnim, {
            toValue: -350,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(starletBottomAnim, {
            toValue: -350,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(starletBottomAnim, {
            toValue: 350,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateStarlets();
  }, [starletTopAnim, starletBottomAnim]);

  return (
    <OverflowHandler disabled={disabled} onPress={event}>
      {/* @ts-ignore */}
      <RedButton>
        <StarletTopRed
          style={{ transform: [{ translateX: starletTopAnim }] }}
          source={require("@assets/icons/starlet-red-right.png")}
        />
        {icon && <Image source={require("@assets/icons/stars.png")} />}
        <ButtonText disabled={disabled}>{title}</ButtonText>
        <StarletBottomRed
          style={{ transform: [{ translateX: starletBottomAnim }] }}
          source={require("@assets/icons/starlet-red-left.png")}
        />
      </RedButton>
    </OverflowHandler>
  );
}
const RedButton = styled(LinearGradient).attrs({
  colors: ["#0e0003", "#3b030d"],
  start: { x: 0.3, y: 0.5 },
  end: { x: 1, y: 0 },
})`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
  border-radius: 25px;
  background-color: #3b030d;
  border: 1px solid #4c0312dc;
  margin: 10px 0px 40px 0px;
  overflow: hidden;
`;
const ButtonText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
  padding-left: 10px;
`;
const StarletTopRed = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: -12px;
  right: 150px;
  height: 25px;
  width: 100px;
`;
const StarletBottomRed = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  bottom: -14px;
  left: 150px;
  height: 25px;
  width: 100px;
`;

export function SocialButton({
  title,
  imgSrc,
  event,
}: {
  title: string;
  imgSrc: ImageSourcePropType;
  event: () => void;
}) {
  return (
    <ButtonBody onPress={event}>
      <IconImage source={imgSrc} />
      <Title>{title}</Title>
    </ButtonBody>
  );
}
const ButtonBody = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 60px;
  border-radius: 50px;
  margin-top: 20px;
  background-color: #997fff51;
`;
const IconImage = styled(Image)`
  width: 30px;
  height: 30px;
`;
const Title = styled(Text)`
  font-weight: 700;
  font-size: 20px;
  color: #d5e4f7;
`;
