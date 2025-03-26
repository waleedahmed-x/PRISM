import React from "react";
import { Image, ImageSourcePropType, TextInput, View } from "react-native";
import styled from "styled-components/native";

export default function SocialInput({
  imgSrc,
}: {
  imgSrc: ImageSourcePropType;
}) {
  return (
    <SocialGroup>
      <Social autoCapitalize="none" />
      <SocialImage source={imgSrc} />
    </SocialGroup>
  );
}
const SocialGroup = styled(View)`
  position: relative;
  height: 55px;
  border-radius: 25px;
  padding: 0px 20px;
  font-size: 20px;
  color: #fff;
  margin: 10px 0px;
  width: 100%;
  border: 0.5px solid #aaa;
  height: 50px;
`;
const Social = styled(TextInput)`
  padding-left: 40px;
  height: 50px;
  color: white;
`;
const SocialImage = styled(Image)`
  position: absolute;
  top: -11px;
  left: -13px;
  width: 90px;
  height: 80px;
`;
