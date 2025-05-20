import { View, Text, Dimensions, Alert } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import styled from "styled-components/native";
import { IQuest } from "@/dummy/quests";
import LootboxCard from "@/components/LootboxCard";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";
import { getAccessToken, useEmbeddedWallet } from "@privy-io/expo";
import axios from "axios";
import { useStats } from "@/contexts/lootboxStats";

export default function Quests({ title, description, reward, game }: IQuest) {
  const { account } = useEmbeddedWallet();
  const { refreshStats } = useStats();
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
            event={async function earnPowerpoints() {
              const sessionToken = await SecureStore.getItemAsync(
                "session-token"
              );
              console.log("sessionToken: ", sessionToken);
              const token = await getAccessToken();
              console.log("address: ", account?.address);
              try {
                const response = await axios.post(
                  "http://localhost:8080/api/lootbox/earn-powerpoints",
                  {
                    userIdentifier: account?.address,
                    providerApp: "PRISM",
                    amount: reward,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "x-prism-session": sessionToken.toString(),
                    },
                  }
                );

                console.log("✅ Response:", response.data);
                refreshStats();
                Alert.alert(
                  "Congrats",
                  `You've earned ${reward} Powerpoints! It will take sometime to update on the app.`
                );
              } catch (error: any) {
                console.error(
                  "❌ Error:",
                  error.response?.data || error.message
                );
              }
            }}
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
