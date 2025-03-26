import React from "react";
import { Text, View } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { IStyledComponentBase } from "styled-components/dist/types";
import { TextProps } from "@interfaces/tags";

const Tag: React.FC<TextProps> = ({ text }) => {
  return (
    <TagParent>
      <Title>{text}</Title>
    </TagParent>
  );
};
const TagParent = styled(View)`
  padding: 7px 15px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-left: 10px;
`;
// ? = = = = = = = = = = = = = = = = = = = = = = = = = = =
const TypeTag: React.FC<TextProps> = ({ text }) => {
  return (
    <TypeTagParent>
      <Title>{text}</Title>
    </TypeTagParent>
  );
};

// .attrs({
// colors: ["#C8A1FA", "#523D6C"],
// start: { x: 0, y: 0 },
// end: { x: 0, y: 1 },
// })`
const TypeTagParent: IStyledComponentBase<any> = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  margin: 15px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-left: 10px;
  border: 1px solid #c8a1fa;
`;
const Title = styled(Text)`
  color: #fff;
  font-weight: 600;
`;

export { Tag, TypeTag };
