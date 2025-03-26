import React from "react";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { HeaderProps } from "@interfaces/header";
import RoundClickable from "./RoundClickable";
import FastImage from "react-native-fast-image";

export default function Header({
  navigation,
  navigateTo,
  screenTitle,
  custom,
  element,
}: HeaderProps): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ width: "100%" }}>
      <HeaderParent>
        {screenTitle === "PRISM" ? (
          <PRISMTitle
            resizeMode="contain"
            source={require("@/assets/icons/prism.gif")}
          />
        ) : (
          <ScreenTitle>{screenTitle}</ScreenTitle>
        )}
        <View>{custom && element}</View>
      </HeaderParent>
    </SafeAreaView>
  );
}

export function HeaderBack({
  navigation,
  navigateTo,
  screenTitle,
  custom,
  element,
}: HeaderProps): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ width: "100%", position: "relative" }}>
      <HeaderParentBack>
        <BackNTitle>
          <RoundClickable
            icon={require("@assets/icons/arrow-left.png")}
            pressEvent={() => navigation.goBack(navigateTo)}
          />
          <ScreenTitle>{screenTitle}</ScreenTitle>
        </BackNTitle>
        <Tools>{custom && element}</Tools>
      </HeaderParentBack>
    </SafeAreaView>
  );
}
const HeaderParent = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  padding-bottom: ${Platform.OS === "ios" ? "0px" : "5px"};
`;
const HeaderParentBack = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  padding-bottom: ${Platform.OS === "ios" ? "0px" : "5px"};
`;

const BackNTitle = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Tools = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: end;
`;
const ScreenTitle = styled(Text)`
  color: white;
  font-size: 25px;
  font-weight: 500;
  margin-left: 20px;
`;
const PRISMTitle = styled(FastImage)`
  width: 150px;
  height: 50px;
  margin: 10px 0px 0px 20px;
`;
