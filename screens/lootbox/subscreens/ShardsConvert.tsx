import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { HeaderBack } from "@/components/header/Header";
import styled from "styled-components/native";
import { CyanHollowButton } from "@/components/ui/Buttons";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";

export default function ShardsConvert({ navigation }) {
  const [balance, _setBalance] = useState(5500);
  const [inputPoints, setInputPoints] = useState("0");

  const parsedPoints = parseInt(inputPoints) || 0;
  const calculatedShards = Math.floor(parsedPoints / 1000);
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
            <AssetTitle>Powerpoints</AssetTitle>
            <StyledInput
              value={inputPoints}
              onChangeText={(value) => {
                const sanitized = value.replace(/[^0-9]/g, "");
                const numericValue = parseInt(sanitized || "0");
                if (numericValue > balance) {
                  Alert.alert(
                    "Insufficient Powerpoints",
                    `You only have ${balance} Powerpoints. The input has been adjusted to your maximum balance.`
                  );
                  setInputPoints(balance.toString());
                } else {
                  setInputPoints(sanitized);
                }
              }}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#aaa"
            />
          </PointsContainer>

          <PointsContainer>
            <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
            <AssetTitle>Shards</AssetTitle>
            <AssetBalance>{calculatedShards}</AssetBalance>
          </PointsContainer>
        </ConversionContainer>
        <CyanGlowButton title="Convert to Shards" event={() => {}} icon />
        {/* <CyanHollowButton
          title="Close"
          event={() => navigation.goBack()}
          icon
        /> */}
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
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledInput = styled(TextInput)`
  letter-spacing: 6px;
  color: #aaa;
  font-size: 30px;
  padding: 10px 0px 10px 30px;
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
  letter-spacing: 6px;
  text-transform: uppercase;
  color: #fff;
  font-size: 25px;
  padding: 20px 0px 0px 20px;
`;
const AssetBalance = styled(Text)`
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
