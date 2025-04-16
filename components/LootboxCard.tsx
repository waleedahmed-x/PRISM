import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

export default function LootboxCard({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) {
  return (
    //   @ts-ignore
    <Parent style={styles}>
      <BorderTop source={require("@/assets/icons/lootbox-border.png")} />
      {children}
      <BorderBottom source={require("@/assets/icons/lootbox-border.png")} />
    </Parent>
  );
}
const Parent = styled(View)`
  position: relative;
  width: 90%;
  align-self: center;
  border-radius: 30px;
  border: 2px solid #b3b5b52e;
  padding: 10px 0px;
`;

const BorderTop = styled(FastImage)`
  position: absolute;
  top: -1px;
  left: 0px;
  width: 100%;
  height: 2px;
  object-fit: contain;
  object-fit: fill;
`;
const BorderBottom = styled(FastImage)`
  position: absolute;
  bottom: -1px;
  left: 0px;
  width: 100%;
  height: 2px;
  object-fit: contain;
`;
