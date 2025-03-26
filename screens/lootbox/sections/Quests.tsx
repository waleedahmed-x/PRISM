import { View, Text, Image } from "react-native";
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
          title="Earn 15 Power Points"
          event={() => {}}
          // icon
          //   icon={require("@assets/icons/shard.png")}
          //    <ShardIcon source={require("@assets/icons/shard.png")} />
        />
      </QuestCard>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 90%;
  align-self: center;
  border-radius: 20px;
  margin-top: 10px;
  background-color: #2d2e3456;
`;

const QuestCard = styled(View)`
  width: 90%;
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
  color: #999999;
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
  /* height: 0.5px; */
  /* background-color: #999; */
  margin: 10px 0;
`;
const ShardIcon = styled(Image)`
  width: 25px;
  height: 26px;
`;
