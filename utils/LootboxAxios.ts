import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "https://lootbox.prisma.win/api/v1";

export const LootboxAxios = axios.create({
  baseURL: BASE_URL,
});

LootboxAxios.interceptors.request.use(
  async (config) => {
    const privyToken = await SecureStore.getItemAsync("privy-token");
    const prismSession = await SecureStore.getItemAsync("session-token");

    if (privyToken) {
      config.headers.Authorization = `Bearer ${privyToken}`;
    }

    if (prismSession) {
      config.headers["x-prism-session"] = prismSession;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
