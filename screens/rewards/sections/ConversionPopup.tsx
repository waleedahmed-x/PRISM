import { View, Text, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { BlurView } from "@react-native-community/blur";
import { PurpleThemeButton, RedThemeButton } from "@/components/ui/Buttons";

const { width, height } = Dimensions.get("screen");

export default function ConversionPopup({
  setShowCononsversionPopup,
}: {
  setShowCononsversionPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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

  return (
    <Backdrop blurAmount={7} blurType="dark">
      <Parent>
        <Title>Convert Powerpoints to Shards</Title>
        <SubPhrase>Balance: {balance} Powerpoint(s)</SubPhrase>
        <ConversionContainer>
          <Subtract onPress={handleSubtract}>-</Subtract>
          <ConvertedShardDisplay>
            <ConvertedShardDisplayText>{shards}</ConvertedShardDisplayText>
          </ConvertedShardDisplay>
          <Add onPress={handleAdd}>+</Add>
        </ConversionContainer>
        <PurpleThemeButton
          title="Convert"
          event={() => {
            Alert.alert("Under Development");
          }}
          icon
        />
        <RedThemeButton
          title="Close"
          icon
          event={() => setShowCononsversionPopup(false)}
        />
      </Parent>
    </Backdrop>
  );
}

const Backdrop = styled(BlurView)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  z-index: 100;
`;

const Parent = styled(View)`
  width: ${width * 0.9}px;
  border-radius: 25px;
  border: 1px solid #ffffff2c;
  padding: 20px 20px 0px 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  background-color: #000000d0;
  box-shadow: 0px 0px 8px #ffffff52;
`;
const Title = styled(Text)`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
  text-align: center;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #646464;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const Subtract = styled(Text)`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  padding-left: 20px;
`;
const ConvertedShardDisplay = styled(View)`
  width: 50%;
  background-color: #3636364c;
  border-radius: 15px;
  padding: 5px;
`;
const ConvertedShardDisplayText = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: 30px;
`;
const Add = styled(Text)`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  padding-right: 20px;
`;
