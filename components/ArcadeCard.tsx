import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Tag, TypeTag } from "./Tags";
import { CardProps } from "@interfaces/arcade";
import { useGameContext } from "@/contexts/gameContext";

function ArcadeCard({
  title,
  tag,
  imgSrc,
  fixedWidth,
  game,
  navigation,
  loot,
}: CardProps): React.JSX.Element {
  const { setSelectedGame } = useGameContext();

  return (
    <CardParent
      fixedWidth={fixedWidth}
      onPress={() => {
        navigation.navigate("Game");
        setSelectedGame(game);
      }}
    >
      <GlassImage src={imgSrc} blurRadius={25} />
      <CardDisplay>
        <CardImage src={imgSrc} />
        {!loot && (
          <ChallengeTags>
            <NameTag>
              <Image source={require("@assets/icons/MrDevin.png")} />
              <NameText>Devin</NameText>
            </NameTag>
            <NumberTag>
              <Image source={require("@assets/icons/MrDevin.png")} />
              <NumberText>14</NumberText>
            </NumberTag>
          </ChallengeTags>
        )}
      </CardDisplay>
      <Description>
        <Name>{title}</Name>
        {!loot ? (
          tag.map((type, id) => <TypeTag key={id} text={type} />)
        ) : (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Under Development",
                "By playing this game you will earn your points."
              )
            }
          >
            <Info source={require("@assets/icons/info.png")} />
          </TouchableOpacity>
        )}
      </Description>
    </CardParent>
  );
}
interface ArcadeCardInterface {
  fixedWidth?: boolean;
}
const CardParent = styled(TouchableOpacity)<ArcadeCardInterface>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  overflow: hidden;
  margin: ${({ fixedWidth }) => (fixedWidth ? "10px 5px" : "10px 10px")};
  width: ${({ fixedWidth }) => (fixedWidth ? "390px" : "95%")};
  overflow: hidden;
`;
const GlassImage = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;
const Description = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Name = styled(Text)`
  color: #fff;
  font-size: 20px;
  padding: 0px 0px 0px 20px;
  font-weight: 500;
  padding: 15px;
`;
const CardDisplay = styled(View)`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ChallengeTags = styled(View)`
  position: absolute;
  top: 20px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 15px;
  z-index: 1;
  width: 100%;
`;
const NameTag = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  padding: 5px 10px;
`;
const NameText = styled(Text)`
  color: #fff;
  font-weight: 600;
  padding-left: 5px;
`;
const Info = styled(Image)`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;
const NumberTag = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  padding: 5px 10px;
`;
const NumberText = styled(Text)`
  color: #fff;
  font-weight: 600;
  padding-left: 5px;
`;
const CardImage = styled(Image)`
  width: 97.5%;
  object-fit: fill;
  height: 200px;
  border-radius: 25px;
  margin-top: 5px;
`;

export default ArcadeCard;
