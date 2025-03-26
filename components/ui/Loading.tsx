import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";

export default function Loading() {
  return (
    <ParentView>
      <ActivityIndicator size="large" color="blue" />
    </ParentView>
  );
}
const ParentView = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #000000c9;
  z-index: 1000;
`;
