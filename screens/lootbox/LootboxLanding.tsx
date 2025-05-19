import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Quests from "./sections/Quests";
import { quests } from "@/dummy/quests";
import Lootbox from "./sections/Lootbox";
import axios from "axios";
import styled from "styled-components/native";
import * as SecureStore from "expo-secure-store";
import ArcadeCard from "@/components/ArcadeCard";
import LootboxCard from "@/components/LootboxCard";
import { useGames } from "@/contexts/gamesContext";
import { HeaderBack } from "@/components/header/Header";
import { useGameContext } from "@/contexts/gameContext";
import { useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";
import UpdateUser from "./UpdateUser";

export default function LootboxLanding({ navigation }) {
  const { games } = useGames();
  const { user, getAccessToken } = usePrivy();
  const { setSelectedGame } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [powerpoints, setPowerpoints] = useState("");
  const { account, create } = useEmbeddedWallet();
  // !
  useEffect(() => {
    if (!account) {
      create()
        .then((account) => {
          console.log("Account created:", account);
        })
        .catch((error) => {
          console.error("Error creating account:", error);
        });
    }
  }, []);
  // !
  async function convertToShards() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
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
    } catch (error: any) {
      // console.error("❌ Error:", error.response?.data || error.message);
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
  async function getPowerpoints() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/lootbox/get-powerpoints?page=1&limit=5000",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );
      const total = response?.data?.data
        .filter((item) => item.userIdentifier === account?.address)
        .reduce((sum, item) => sum + parseFloat(item.amount), 0);
      setPowerpoints(total);
      console.log("Total Points:", total);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
  async function getLinkedPowerpoints() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
      const response = await axios.get(
        "http://localhost:8080/api/lootbox/powerpoints-linked",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );
      const total = response?.data;
      setPowerpoints(total.totalPointsSum);
      console.log("Total Points:", total);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
  async function getStatsByUser() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/lootbox/stats-by-user`,
        // {
        // evmWalletAddress: account?.address,
        // userId: user?.id,
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );

      console.log("✅ Response:", response.data);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
  async function getStats() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/lootbox/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );

      console.log("✅ Response:", response.data);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
  async function getShards() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    console.log("token: ", token);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/lootbox/shards?page=1&limit=5000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      );

      console.log("✅ Response:", response.data);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }

  async function earnPowerpoints() {
    const sessionToken = await SecureStore.getItemAsync("session-token");
    console.log("sessionToken: ", sessionToken);
    const token = await getAccessToken();
    // console.log("token: ", token);
    console.log("address: ", account?.address);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/lootbox/earn-powerpoints",
        {
          // userId: user?.id,
          userIdentifier: account?.address,
          providerApp: "PRISM",
          amount: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken.toString(),
          },
        }
      );

      console.log("✅ Response:", response.data);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }

  const authenticate = async () => {
    const accessToken = await getAccessToken();
    const body = {
      privyId: user.id,
      email: "waleed@authornate.com",
      accessToken,
    };
    axios
      .post(`http://localhost:8080/api/lootbox/auth`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (r) => {
        console.log(r.data);
        await SecureStore.setItemAsync("session-token", r.data.token);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SuperParent>
      <HeaderBack
        navigation={navigation}
        navigateTo="Home"
        screenTitle="Lootbox"
        custom
        element={
          <TouchableOpacity
            onPressIn={() =>
              Alert.alert(
                "Under Development",
                "You have 1 ticket. You will have 1 ticket daily for free for which you can play games and earn."
              )
            }
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>
              1
            </Text>
            <Image
              source={require("@assets/icons/ticket.png")}
              style={{ marginLeft: 8, width: 30, height: 20 }}
            />
          </TouchableOpacity>
        }
      />
      <BGVector source={require("@assets/images/lootbox-bg.png")} />
      <ScrollView>
        {/* <AnimatedBackground /> */}
        <UpdateUser />
        <TitleBox>
          <Title>WELCOME</Title>
          <SubPhrase>
            Win prizes, visit everyday to earn exciting rewards!
          </SubPhrase>
        </TitleBox>
        <LootboxCard>
          <LabelValue>
            <Label>Common Shards</Label>
            <Inventory>
              2 <StatsIcon source={require("@assets/icons/shard.png")} />
            </Inventory>
          </LabelValue>
          <LabelValue>
            <Label>Epic Shards</Label>
            <Inventory>
              5 <StatsIcon source={require("@assets/icons/epic-shard.png")} />
            </Inventory>
          </LabelValue>
          <LabelValue>
            <Label>Power Points</Label>
            <Inventory>
              {powerpoints.toString() || "NaN"}{" "}
              <StatsIcon source={require("@assets/icons/power.png")} />
            </Inventory>
          </LabelValue>
          <LabelValue>
            <Label>Quests</Label>
            <Inventory>
              1/5 <StatsIcon source={require("@assets/icons/quest.png")} />
            </Inventory>
          </LabelValue>
        </LootboxCard>
        <TitleBox>
          <Title>
            <TitleImage source={require("@assets/icons/fire.png")} />
            POWERPOINTS
          </Title>
          <SubPhrase>
            Unleash your skills to rack up Powerpoints! Turn your Powerpoints
            into shards!
          </SubPhrase>
          <View style={{ marginBottom: 10 }} />
          <CyanGlowButton
            title={loading ? "Loading..." : "Convert to shards"}
            icon
            disabled={loading}
            event={convertToShards}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "See Stats By User"}
            icon
            disabled={loading}
            event={getStatsByUser}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "See Stats"}
            icon
            disabled={loading}
            event={getStats}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "See Shards"}
            icon
            disabled={loading}
            event={getShards}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "See Powerpoints"}
            icon
            disabled={loading}
            event={getPowerpoints}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "See Powerpoints /linked"}
            icon
            disabled={loading}
            event={getLinkedPowerpoints}
            styles={{ marginTop: 15 }}
          />

          <CyanGlowButton
            title={loading ? "Loading..." : "Earn Powerpoints call"}
            icon
            disabled={loading}
            // event={getShards}
            event={earnPowerpoints}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title={loading ? "Loading..." : "Authenticate"}
            icon
            disabled={loading}
            event={authenticate}
            styles={{ marginTop: 15 }}
          />
          <CyanGlowButton
            title="Earn Powerpoints (redirect)"
            icon
            event={() => {
              navigation.navigate("Game");
              setSelectedGame(games[0]); // TODO: What game should be selected?
            }}
            styles={{ marginTop: 15 }}
          />
        </TitleBox>
        <TitleBox>
          <Title>
            <TitleImage source={require("@assets/icons/epic-shard.png")} />
            SHARDS
          </Title>
          <SubPhrase>
            Crack open lootboxes for a shot at snagging valuable shards!
          </SubPhrase>
          <SubPhraseInfo>
            <InfoIcon source={require("@assets/icons/info.png")} />
            1000 powerpoints equals 1 shard
          </SubPhraseInfo>
          <View style={{ marginBottom: 10 }} />
          <CyanGlowButton
            icon
            title="Covert to Shards"
            event={() => navigation.navigate("Shards Convert")}
            styles={{ marginTop: 15 }}
          />
        </TitleBox>
        <TitleBox>
          <Title>
            <TitleImage source={require("@assets/icons/quest.png")} />
            QUESTS
          </Title>
          <SubPhrase>
            Embark on epic quests and claim thrilling rewards!
          </SubPhrase>
        </TitleBox>
        {quests && quests.map((q, i) => <Quests {...q} key={i} />)}

        <TitleBox>
          <Title>
            <TitleImage source={require("@assets/icons/lootbox.png")} />
            LOOT BOXES
          </Title>
          <SubPhrase>
            Unlock common and epic lootboxes to score amazing rewards and
            surprises!
          </SubPhrase>
        </TitleBox>
        <Lootbox />
        <TitleBox>
          <Title>
            <TitleImage source={require("@assets/icons/game.png")} />
            GAMES
          </Title>
          <SubPhrase>
            Play games to win powerpoints, lootboxes, and incredible rewards
            full of excitement!
          </SubPhrase>
        </TitleBox>
        {games &&
          games
            .slice(0, 3)
            .map((game, index) => (
              <ArcadeCard
                key={index}
                title={game.title}
                tag={game.genres}
                imgSrc={game.image}
                game={game}
                loot
                navigation={navigation}
              />
            ))}
      </ScrollView>
    </SuperParent>
  );
}
const SuperParent = styled(View)`
  background-color: #000;
  height: 100%;
  width: ${Dimensions.get("screen").width}px;
  overflow: hidden;
  align-items: center;
  width: 100%;
`;
const BGVector = styled(Image)`
  position: absolute;
  top: -70px;
  width: 100%;
`;

const LabelValue = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
  width: 90%;
`;
const Label = styled(Text)`
  color: #b6b6b6;
  font-size: 17px;
  font-weight: 700;
`;
const Inventory = styled(Text)`
  color: white;
  font-size: 17px;
  font-weight: 900;
  margin: 10px 0px;
`;
const StatsIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;
const TitleBox = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0px 0px 0px;
`;
const TitleImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const Title = styled(Text)`
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
  font-weight: 800;
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
const InfoIcon = styled(Image)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;
const SubPhraseInfo = styled(Text)`
  color: #b6b6b6;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
`;
