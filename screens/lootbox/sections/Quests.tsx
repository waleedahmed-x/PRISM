import { View, Text, Image, Dimensions, Alert } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { IQuest } from "@/dummy/quests";
import LootboxCard from "@/components/LootboxCard";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";

export default function Quests({ title, description, reward, game }: IQuest) {
  return (
    <LootboxCard styles={{ marginTop: 20 }}>
      <Container>
        <QuestCard>
          <QuestTitle>{title}</QuestTitle>
          <QuestDescription>{description}</QuestDescription>
          <QuestDetail>Reward: {reward} Powerpoint(s)</QuestDetail>
          <QuestDetail>Game: {game}</QuestDetail>
          <Divider />
          <CyanGlowButton
            title={`Earn ${reward} Powerpoints`}
            event={() => Alert.alert("Under Development")}
          />
        </QuestCard>
      </Container>
    </LootboxCard>
  );
}

const Container = styled(View)`
  width: ${Dimensions.get("screen").width / 1.1}px;
  align-self: center;
`;

const QuestCard = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const QuestTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

const QuestDescription = styled(Text)`
  font-size: 16px;
  color: #999;
  margin-bottom: 15px;
`;

const QuestDetail = styled(Text)`
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;
`;

const Divider = styled(View)`
  margin: 10px 0;
`;
