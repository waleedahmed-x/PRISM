import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { getAccessToken, useEmbeddedWallet } from "@privy-io/expo";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserStat {
  evmWalletAddress: string;
  id: number;
  photo: string | null;
  tonWalletAddress: string;
  totalPowerPoints: number;
  totalShards: number;
  userName: string;
}

type StatsContextType = {
  evmWalletAddress: string;
  id: number;
  photo: string | null;
  tonWalletAddress: string;
  totalPowerPoints: number;
  totalShards: number;
  userName: string;
  loading: boolean;
  refreshStats: () => void;
};

const StatsContext = createContext<StatsContextType | null>(null);

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [userStat, setUserStat] = useState<UserStat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { account } = useEmbeddedWallet();

  const getStats = async () => {
    setLoading(true);
    try {
      const sessionToken = await SecureStore.getItemAsync("session-token");
      const token = await getAccessToken();

      const response = await axios.get<UserStat[]>(
        "http://localhost:8080/api/lootbox/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken || "",
          },
        }
      );

      const filteredStat = response.data.find(
        (user) => user.evmWalletAddress === account.address
      );

      setUserStat(filteredStat || null);
    } catch (error: any) {
      console.error(
        "❌ Error fetching stats:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account?.address) getStats();
  }, [account?.address]);

  return (
    <StatsContext.Provider
      value={{
        evmWalletAddress: userStat?.evmWalletAddress || "",
        id: userStat?.id || 0,
        photo: userStat?.photo || null,
        tonWalletAddress: userStat?.tonWalletAddress || "",
        totalPowerPoints: userStat?.totalPowerPoints || 0,
        totalShards: userStat?.totalShards || 0,
        userName: userStat?.userName || "",
        loading,
        refreshStats: getStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error("useStats must be used within a StatsProvider");
  return context;
};
