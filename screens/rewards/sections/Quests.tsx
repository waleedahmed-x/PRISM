import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { IQuest } from "@/dummy/quests";
import { PurpleThemeButton } from "@/components/ui/Buttons";

export default function Quests({
  title,
  description,
  reward,
  progress,
}: IQuest) {
  return (
    <Container>
      <QuestCard>
        <QuestTitle>{title}</QuestTitle>
        <QuestDescription>{description}</QuestDescription>
        <QuestDetail>Reward: ${reward}</QuestDetail>
        <QuestDetail>Progress: {progress}%</QuestDetail>
        <Divider />
        <PurpleThemeButton
          title={`Earn ${
            Math.floor(Math.random() * (90 - 10 + 1)) + 10
          } Power Points`}
          event={() => {}}
          icon
        />
      </QuestCard>
    </Container>
  );
}

const Container = styled(View)`
  width: ${Dimensions.get("screen").width / 1.1}px;
  align-self: center;
  border-radius: 25px;
  margin-top: 15px;
  border: 1px solid #ffffff20;
  background-color: #2d2e3456;
`;

const QuestCard = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  shadow-color: #ffffff;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
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
