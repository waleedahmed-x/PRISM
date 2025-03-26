import React, { useRef, useEffect } from "react";
import { Animated, Text, View, Dimensions, Easing } from "react-native";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

export default function TabNavigator({
  selectedTab,
  setSelectedTab,
  data,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  data: {
    label: string;
    value: string;
  }[];
}) {
  const shineTopPosition = useRef(new Animated.Value(-screenWidth)).current;
  const shineBottomPosition = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    const shineTopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineTopPosition, {
          toValue: screenWidth + 200,
          duration: 12000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shineTopPosition, {
          toValue: -screenWidth,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    );

    const shineBottomAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shineBottomPosition, {
          toValue: -screenWidth - 210,
          duration: 12000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shineBottomPosition, {
          toValue: screenWidth,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    );
    shineTopAnimation.start();
    shineBottomAnimation.start();
    return () => {
      shineTopAnimation.stop();
      shineBottomAnimation.stop();
    };
  }, [shineTopPosition, shineBottomPosition]);

  return (
    <TabNavigatorParent>
      <TabNavigatorContainer>
        <AnimatedShineTop
          source={require("@assets/icons/shine.png")}
          style={{
            transform: [{ translateX: shineTopPosition }],
          }}
        />
        {data &&
          data.map((data, i) => {
            return (
              <TitleButton
                key={i}
                onPress={() => setSelectedTab(data.value)}
                selection={selectedTab}
                label={data.label}
              >
                {data.label}
              </TitleButton>
            );
          })}
        <AnimatedShineBottom
          source={require("@assets/icons/shine.png")}
          style={{
            transform: [{ translateX: shineBottomPosition }],
          }}
        />
      </TabNavigatorContainer>
    </TabNavigatorParent>
  );
}

const TabNavigatorParent = styled(View)`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 90px;
`;

const TabNavigatorContainer = styled(View)`
  position: absolute;
  left: -5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 0.5px solid #997fffdc;
  width: 102%;
  padding: 20px;
  z-index: 1;
`;

interface TitleButtonInterface {
  selection: string;
  label: string;
}

const TitleButton = styled(Text)<TitleButtonInterface>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ selection, label }) =>
    selection === label ? "#fff" : "#ffffff90"};
  text-shadow-color: ${({ selection, label }) =>
    selection === label ? "#ffffff" : "transparent"};
  text-shadow-radius: ${({ selection, label }) =>
    selection === label ? "8px" : "0px"};
`;

const AnimatedShineTop = styled(Animated.Image)`
  position: absolute;
  top: -20px;
  left: -200px;
  width: 100px;
`;

const AnimatedShineBottom = styled(Animated.Image)`
  position: absolute;
  bottom: -20px;
  right: -200px;
  width: 100px;
`;
