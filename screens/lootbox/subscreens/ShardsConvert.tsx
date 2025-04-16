import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { HeaderBack } from "@/components/header/Header";
import styled from "styled-components/native";
import useCustomFont from "@/hooks/useFonts";
import { CyanHollowButton } from "@/components/ui/Buttons";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";

export default function ShardsConvert({ navigation }) {
  const [balance, _setBalance] = useState(5500);
  const [shards, setShards] = useState(0);
  const handleAdd = () => {
    if (balance >= (shards + 1) * 1000) {
      setShards(shards + 1);
    } else {
      const needed = (shards + 1) * 1000 - balance;
      Alert.alert(
        "Insufficient Powerpoints",
        `Your current balance is ${balance} Powerpoints. You need ${needed} more Powerpoints to convert ${
          shards + 1
        } Shards.`
      );
    }
  };

  const handleSubtract = () => {
    if (shards > 0) {
      setShards(shards - 1);
    }
  };

  const fontsLoaded = useCustomFont();

  if (!fontsLoaded) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }
  return (
    <Parent>
      <HeaderBack
        navigation={navigation}
        navigateTo="Lootbox Landing"
        screenTitle="Convert"
      />
      <BGVector source={require("@assets/images/lootbox-bg.png")} />
      <CenterContainer>
        <Title>Convert Powerpoints to Shards</Title>
        <SubPhrase>Balance: {balance} Powerpoint(s)</SubPhrase>
        <ConversionContainer>
          <PointsContainer>
            <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
            <AssetTitle>powerpoints</AssetTitle>
            <AssetBalance>500</AssetBalance>
          </PointsContainer>
          <Inverter>
            <Invert source={require("@assets/icons/inverter.png")} />
          </Inverter>
          <PointsContainer>
            <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
            <AssetTitle>shards</AssetTitle>
            <AssetBalance>3</AssetBalance>
          </PointsContainer>
        </ConversionContainer>
        <CyanGlowButton title="Convert to Shards" event={() => {}} icon />
        <CyanHollowButton title="Close" event={() => {}} icon />
      </CenterContainer>
    </Parent>
  );
}
const Parent = styled(View)`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
`;
const CenterContainer = styled(View)`
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Inverter = styled(TouchableOpacity)`
  position: relative;
  width: 100%;
`;
const Invert = styled(Image)`
  position: absolute;
  top: -25px;
  left: 42%;
  width: 50px;
  height: 50px;
`;
const PointsContainer = styled(View)`
  position: relative;
  background-color: #3e3e3e44;
  border-radius: 20px;
  width: 100%;
  margin: 5px 0px;
`;
const Zaxis = styled(Image)`
  position: absolute;
  top: -47px;
  right: 0px;
  width: 30%;
  object-fit: contain;
`;
const AssetTitle = styled(Text)`
  font-family: "TachyonRegular";
  letter-spacing: 6px;
  text-transform: uppercase;
  color: #fff;
  font-size: 25px;
  padding: 20px 0px 0px 20px;
`;
const AssetBalance = styled(Text)`
  font-family: "TachyonRegular";
  letter-spacing: 6px;
  color: #aaa;
  font-size: 30px;
  padding: 10px 0px 10px 30px;
`;
const Title = styled(Text)`
  color: #fff;
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
  padding: 0px 10px;
  font-family: "TachyonRegular";
  letter-spacing: 6px;
  text-transform: uppercase;
`;
const SubPhrase = styled(Text)`
  color: #b6b6b6;
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
  padding: 0px 20px;
`;
const ConversionContainer = styled(View)`
  width: 90%;
`;
const BGVector = styled(Image)`
  position: absolute;
  top: 200px;
  width: 100%;
`;
const LoadingContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #000;
`;
