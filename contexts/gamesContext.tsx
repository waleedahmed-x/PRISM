import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

interface Game {
  id: string;
  genres: string[];
  image: string;
  orientation: "landscape" | "portrait";
  title: string;
  url: string;
}

interface GamesContextType {
  games: Game[];
  loading: boolean;
  error: string | null;
  refetchGames: () => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const GamesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/games`
      );
      if (response.status === 200) {
        setGames(response.data.games);
      } else {
        setError(`Failed to fetch games: ${response.status}`);
      }
    } catch (err) {
      setError("Error fetching games");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <GamesContext.Provider
      value={{ games, loading, error, refetchGames: fetchGames }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
};
