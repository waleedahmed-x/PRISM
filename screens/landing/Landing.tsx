import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Easing,
} from "react-native";
import styled from "styled-components/native";
import AsyncLogger from "@/utils/AsyncLogger";
import FastImage from "react-native-fast-image";
import React, { useRef, useEffect } from "react";
import { useUser } from "@/contexts/authContext";
import { useUserDatabase } from "@/contexts/userContext";

const screenWidth = Dimensions.get("window").width;

export default function Landing({ navigation }: any) {
  const { user, logoutGlobal } = useUser();
  const { fetchFreshUser } = useUserDatabase();
  useEffect(() => {
    setTimeout(() => {
      fetchFreshUser();
    }, 2000);
  }, []);
  AsyncLogger();
  useEffect(() => {
    if (!user) {
      logoutGlobal();
    }
  }, []);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const shineTopPosition = useRef(new Animated.Value(-screenWidth)).current;
  const shineBottomPosition = useRef(new Animated.Value(screenWidth)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 360,
        duration: 2000000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const shineTopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineTopPosition, {
          toValue: screenWidth,
          duration: 10000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shineTopPosition, {
          toValue: -screenWidth - 300,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    const shineBottomAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineBottomPosition, {
          toValue: -screenWidth,
          duration: 10000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shineBottomPosition, {
          toValue: screenWidth + 300,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnimation.start();
    shineTopAnimation.start();
    shineBottomAnimation.start();

    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    return () => {
      rotateAnimation.stop();
      shineTopAnimation.stop();
      shineBottomAnimation.stop();
    };
  }, [rotateValue, shineTopPosition, shineBottomPosition]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <AnimatedParent style={{ opacity: fadeInOpacity }}>
      <AnimationsContainer>
        <Animated.Image
          source={require("@assets/images/hero.png")}
          style={{
            width: "100%",
            transform: [{ rotate: spin }],
          }}
          resizeMode="contain"
        />
        <PrismAnimationParent>
          <PrismAnimation
            source={require("@assets/splash/splash.gif")}
            resizeMode="contain"
          />
        </PrismAnimationParent>
      </AnimationsContainer>
      <PlayParent onPress={() => navigation.navigate("Prism Arcade")}>
        <AnimatedShineTop
          source={require("@assets/icons/shine.png")}
          style={{
            transform: [{ translateX: shineTopPosition }],
          }}
        />
        <TitleButton>PLAY</TitleButton>
        <AnimatedShineBottom
          source={require("@assets/icons/shine.png")}
          style={{
            transform: [{ translateX: shineBottomPosition }],
          }}
        />
        <Vector source={require("@assets/images/vector-bg.png")} />
      </PlayParent>
    </AnimatedParent>
  );
}

const AnimatedParent = styled(Animated.View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
`;
const AnimationsContainer = styled(View)`
  position: relative;
  width: 100%;
`;
const PrismAnimationParent = styled(View)`
  position: absolute;
  left: 25%;
  top: 26%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 50%;
  border-radius: 80px;
  height: 200px;
  background: #000;
  overflow: hidden;
`;
const PrismAnimation = styled(FastImage)`
  background: #000;
  width: 100%;
  height: 100%;
`;

const Vector = styled(Image)`
  position: absolute;
  top: -320%;
`;

const PlayParent = styled(TouchableOpacity)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #997fffdc;
  width: 105%;
  padding: 20px;
  z-index: 1;
`;

const TitleButton = styled(Text)`
  font-size: 28px;
  color: #fff;
  font-weight: 700;
`;

const AnimatedShineTop = styled(Animated.Image)`
  position: absolute;
  top: -20px;
  left: 0px;
  width: 100px;
`;

const AnimatedShineBottom = styled(Animated.Image)`
  position: absolute;
  bottom: -20px;
  width: 100px;
  right: 0px;
`;
