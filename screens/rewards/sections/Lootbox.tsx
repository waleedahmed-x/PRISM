import { View, ScrollView, Image, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export default function Lootbox() {
  return (
    <Parent>
      <ScrollView horizontal>
        <LootboxContainer>
          <LootboxIcon source={require("@assets/icons/Clootbox.png")} />
          <CommonLoot>Common Lootbox</CommonLoot>
        </LootboxContainer>
        <LootboxContainer>
          <LootboxIcon source={require("@assets/icons/Clootbox.png")} />
          <EpicLoot>Epic Lootbox</EpicLoot>
        </LootboxContainer>
        <LootboxContainer>
          <LootboxIcon source={require("@assets/icons/Clootbox.png")} />
          <CommonLoot>Common Lootbox</CommonLoot>
        </LootboxContainer>
      </ScrollView>
    </Parent>
  );
}
const Parent = styled(View)`
  width: 100%;
`;
const LootboxContainer = styled(View)`
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 240px;
  background-color: #2d2e3456;
  border-radius: 25px;
  border: 1px solid #ffffff20;
  margin: 20px 20px 0px 20px;
`;
const LootboxIcon = styled(Image)`
  width: 150px;
  height: 150px;
`;
const CommonLoot = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;
const EpicLoot = styled(Text)`
  color: gold;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;
