import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";

type RootStackParamList = {
  home: undefined;
};

type ArcadeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface PrismHomeProps {
  navigation: ArcadeScreenNavigationProp;
}

export interface CardProps {
  title: string;
  tag: string[];
  imgSrc: string;
  fixedWidth?: boolean;
  loot?: boolean;
  game: {
    title: string;
    url: string;
    image: string | ImageSourcePropType;
  };
  navigation: any;
}
