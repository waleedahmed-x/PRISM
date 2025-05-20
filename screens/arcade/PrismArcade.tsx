import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import ArcadeCard from "@components/ArcadeCard";
import Header from "@components/header/Header";
import { PrismHomeProps } from "@interfaces/arcade";
import TabNavigator from "@/components/ui/TabNavigator";
import { useUserDatabase } from "@/contexts/userContext";
import { useGames } from "@/contexts/gamesContext";
import Loading from "@/components/ui/Loading";
import { useLootboxAuth } from "@/contexts/lootboxAuth";

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
  const [searchTerm, setSearchTerm] = useState("");
  const { games, loading, refetchGames } = useGames();
  const [selectedTab, setSelectedTab] = useState("Latest");
  const { authenticate } = useLootboxAuth();
  useEffect(() => {
    authenticate();
  }, []);

  return (
    <SuperParent>
      {loading && <Loading />}
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
      <ArcadeContentParent
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetchGames} />
        }
      >
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
