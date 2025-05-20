import React, { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { getAccessToken, usePrivy } from "@privy-io/expo";

const LAST_AUTH_KEY = "last-lootbox-auth-time";
const SESSION_TOKEN_KEY = "session-token";

type LootboxAuthContextType = {
  sessionToken: string | null;
  loading: boolean;
  error: string | null;
  authenticate: () => Promise<void>;
};

const LootboxAuthContext = createContext<LootboxAuthContextType | null>(null);

export const LootboxAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = usePrivy();

  const authenticate = async () => {
    setLoading(true);
    setError(null);

    try {
      const lastAuthTime = await SecureStore.getItemAsync(LAST_AUTH_KEY);
      const now = Date.now();

      // If last auth was within 3 hours, skip
      if (lastAuthTime && now - parseInt(lastAuthTime) < 3 * 60 * 60 * 1000) {
        const storedToken = await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
        if (storedToken) {
          setSessionToken(storedToken);
          console.log("🟨 Using cached session token (within 3 hours)");
        }
        setLoading(false);
        return;
      }

      const accessToken = await getAccessToken();

      const body = {
        privyId: user?.id,
        email: "waleed@authornate.com",
        accessToken,
      };

      const response = await axios.post(
        "http://localhost:8080/api/lootbox/auth",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const token = response.data.token;
      await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
      await SecureStore.setItemAsync(LAST_AUTH_KEY, now.toString());

      setSessionToken(token);
      console.log("🟩 USER AUTHENTICATED WITH LOOTBOX");
    } catch (e: any) {
      console.error("❌ Auth Error:", e.response?.data || e.message);
      setError(e.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LootboxAuthContext.Provider
      value={{ sessionToken, loading, error, authenticate }}
    >
      {children}
    </LootboxAuthContext.Provider>
  );
};

export const useLootboxAuth = () => {
  const context = useContext(LootboxAuthContext);
  if (!context)
    throw new Error("useLootboxAuth must be used within a LootboxAuthProvider");
  return context;
};
