import { ImageSourcePropType } from "react-native";

interface BaseHeaderProps {
  navigation: any;
  navigateTo: string;
  screenTitle: string;
}

interface CustomHeaderProps extends BaseHeaderProps {
  custom?: true;
  element?: React.JSX.Element;
}

interface DefaultHeaderProps extends BaseHeaderProps {
  custom?: false;
  element?: never;
}

export type HeaderProps = CustomHeaderProps | DefaultHeaderProps;

export interface RoundClickableProps {
  pressEvent: () => void;
  icon: ImageSourcePropType;
}
