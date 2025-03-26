import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

interface Game {
  title: string;
  url: string;
  image: string | ImageSourcePropType;
  orientation?: string;
}

interface GameContextType {
  selectedGame: Game;
  setSelectedGame: React.Dispatch<React.SetStateAction<Game>>;
}

const defaultContextValue: GameContextType = {
  selectedGame: {
    title: "",
    url: "",
    image: "",
    orientation: "",
  },
  setSelectedGame: () => {},
};

const GameContext = createContext<GameContextType>(defaultContextValue);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedGame, setSelectedGame] = useState<Game>({
    title: "",
    url: "",
    orientation: "",
    image: "",
  });

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
