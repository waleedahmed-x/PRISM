import React from "react";
import { Animated, Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { AlertInterface } from "@/interfaces/Alerts";

export default function Alerts({ state, text, show }: AlertInterface) {
  const iconSource = {
    success: require("@assets/icons/success.png"),
    loading: require("@assets/icons/loading.png"),
    warning: require("@assets/icons/warning.png"),
    error: require("@assets/icons/error.png"),
    // @ts-ignore
  }[state];

  return (
    show && (
      <AlertParent>
        <AlertCenter>
          <Icon source={iconSource} />
          <Content>{text}</Content>
        </AlertCenter>
      </AlertParent>
    )
  );
}

const AlertParent = styled(Animated.View)`
  position: absolute;
  bottom: 50px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 50px;
  z-index: 100;
`;

const AlertCenter = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background-color: #171717e8;
  border: 0.5px solid #aaa;
  width: 90%;
  border-radius: 15px;
`;

const Content = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  flex: 1;
  text-align: center;
`;

const Icon = styled(Image)`
  width: 30px;
  height: 30px;
`;
