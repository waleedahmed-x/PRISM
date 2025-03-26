import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import ArcadeCard from "@components/ArcadeCard";
import Header from "@components/header/Header";
import { PrismHomeProps } from "@interfaces/arcade";
import TabNavigator from "@/components/ui/TabNavigator";
import { useUserDatabase } from "@/contexts/userContext";
import { usePrivy, useEmbeddedWallet } from "@privy-io/expo";
import { ImageSourcePropType } from "react-native";
import axios from "axios";
const getImageSource = (uri: string): ImageSourcePropType => ({ uri });

function Avatar({ navigation }: any) {
  const { userDatabase } = useUserDatabase();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <AvatarImage
        source={
          userDatabase?.avatarId
            ? { uri: userDatabase.avatarId }
            : require("@assets/icons/avatar.png")
        }
      />
    </TouchableOpacity>
  );
}
const AvatarImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
const tabData = [
  {
    label: "Featured",
    value: "Featured",
  },
  {
    label: "Latest",
    value: "Latest",
  },
  {
    label: "Top",
    value: "Top",
  },
];
const HeaderProps = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Lootbox")}>
        <Image
          source={require("@assets/icons/lootbox.png")}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
      </TouchableOpacity>
      <Avatar navigation={navigation} />
    </View>
  );
};
export default function PrismArcade({
  navigation,
}: PrismHomeProps): React.JSX.Element {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Latest");
  const { isReady, user } = usePrivy();
  const wallet = useEmbeddedWallet();
  const { userDatabase } = useUserDatabase();

  useEffect(() => {
    const fetchGames = async () => {
      axios
        .get(`${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/games`)
        .then((response) => {
          if (response.status === 200) {
            // Assuming the response data structure matches the expected games structure
            setGames(response.data.games);
          } else {
            console.error("Failed to fetch games:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
        });
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!user && !userDatabase) navigation.navigate("home");
    const asyncCreate = async () => {
      try {
        await wallet.create();
      } catch (error) {
        console.error("Error creating wallet:", error);
      }
    };
    if (wallet.status == "not-created") {
      asyncCreate();
    }
  }, []);

  return (
    <SuperParent>
      <Header
        navigation={navigation}
        navigateTo="Home"
        screenTitle="PRISM"
        custom
        element={<HeaderProps navigation={navigation} />}
      />
      <BGVector source={require("@assets/images/vector-bg.png")} />
      <TabNavigator
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        data={tabData}
      />
      <ArcadeContentParent>
        <SearchContainer>
          <SearchInputContainer>
            <SearchInputImage source={require("@assets/icons/search.png")} />
            <SearchInput
              placeholder="Search"
              placeholderTextColor="grey"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </SearchInputContainer>
          <FilterButton>
            <FilterImage source={require("@assets/icons/filter.png")} />
          </FilterButton>
        </SearchContainer>
        <Latest>
          <Cards>
            {games.map((game, i) => {
              if (game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return (
                  <ArcadeCard
                    key={i}
                    title={game.title}
                    tag={game.genres}
                    imgSrc={game.image}
                    game={game}
                    navigation={navigation}
                  />
                );
              } else return null;
            })}
          </Cards>
        </Latest>
      </ArcadeContentParent>
    </SuperParent>
  );
}

const SuperParent = styled(View)`
  background-color: #000;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const BGVector = styled(Image)`
  position: absolute;
  top: 120px;
  width: 100%;
`;

const SearchContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  width: 100%;
  margin-top: 20px;
`;

const SearchInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #3636364c;
  border-radius: 15px;
  width: 85%;
  overflow: hidden;
`;
const SearchInput = styled(TextInput)`
  border-radius: 15px;
  color: #fff;
  background-color: transparent;
  padding: 15px;
  height: 50px;
  width: 90%;
`;

const SearchInputImage = styled(Image)`
  margin-left: 10px;
`;
const FilterImage = styled(Image)``;
const FilterButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #2d2e3499;
  height: 50px;
  width: 50px;
`;
const ArcadeContentParent = styled(ScrollView)``;
const Cards = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Latest = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  width: 100%;
  margin-top: 30px;
`;
