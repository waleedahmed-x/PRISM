import { View, ScrollView, Image, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export default function Lootbox() {
  return (
    <Parent>
      <ScrollView horizontal>
        <LootboxContainer>
          <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
          <LootboxIcon source={require("@assets/icons/lootbox.png")} />
          <CommonLoot>Common Lootbox</CommonLoot>
        </LootboxContainer>
        <LootboxContainer>
          <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
          <LootboxIcon source={require("@assets/icons/lootbox.png")} />
          <EpicLoot>Epic Lootbox</EpicLoot>
        </LootboxContainer>
        <LootboxContainer>
          <Zaxis source={require("@assets/icons/Zaxis-border.png")} />
          <LootboxIcon source={require("@assets/icons/lootbox.png")} />
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
  position: relative;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 240px;
  background-color: #2d2e3426;
  border-radius: 35px;
  border: 1px solid #1c1c1c;
  margin: 20px 20px 0px 20px;
`;
const Zaxis = styled(Image)`
  position: absolute;
  top: -20px;
  right: 0px;
  width: 50%;
  object-fit: contain;
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
