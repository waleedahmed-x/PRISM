import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components/native";
import { getAccessToken } from "@privy-io/expo";
import * as SecureStore from "expo-secure-store";
import { useStats } from "@/contexts/lootboxStats";
import { HeaderBack } from "@/components/header/Header";
import { View, Text, Image, Alert, TextInput } from "react-native";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";

export default function ShardsConvert({ navigation }) {
  const { totalPowerPoints } = useStats();
  const [balance, _setBalance] = useState(totalPowerPoints || 0);
  const [inputPoints, setInputPoints] = useState(totalPowerPoints.toString());
  const parsedPoints = parseInt(inputPoints) || 0;
  const calculatedShards = Math.floor(parsedPoints / 1000);
  async function convertToShards() {
    const parsedPoints = parseInt(inputPoints) || 0;

    if (parsedPoints < 1000) {
      Alert.alert(
        "Insufficient Powerpoints",
        "You need at least 1000 Powerpoints to convert to 1 Shard."
      );
      return;
    }

    try {
      const sessionToken = await SecureStore.getItemAsync("session-token");
      const token = await getAccessToken();

      const response = await axios.post(
        "http://localhost:8080/api/lootbox/convert-to-commonshards",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );

      console.log("✅ Response:", response.data);

      Alert.alert("Success", "Powerpoints successfully converted to shards.");
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong during conversion.");
    }
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
        <CyanGlowButton
          title="Convert to Shards"
          event={convertToShards}
          icon
        />
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
