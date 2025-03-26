import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RoundClickableProps} from '@interfaces/header';

export default function RoundClickable({
  pressEvent,
  icon,
}: RoundClickableProps): React.JSX.Element {
  return (
    <Clickable onPress={pressEvent}>
      <StyledImage source={icon} />
    </Clickable>
  );
}
const Clickable = styled(TouchableOpacity)`
  margin: 3px;
`;
const StyledImage = styled(Image)`
  width: 40px;
  height: 40px;
`;
