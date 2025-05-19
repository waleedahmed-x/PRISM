import React from "react";
import { CyanGlowButton } from "@/components/ui/CyanAnimatedButton";
import axios from "axios";
import { getAccessToken, useEmbeddedWallet } from "@privy-io/expo";
import * as SecureStore from "expo-secure-store";

export default function UpdateUser() {
  const { account } = useEmbeddedWallet();
  const updateUser = async () => {
    console.log("Account address:", account?.address);
    const sessionToken = await SecureStore.getItemAsync("session-token");
    const token = await getAccessToken();
    axios
      .patch(
        "http://localhost:8080/api/lootbox/user/update",
        {
          userId: 7,
          walletAddress: account?.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-prism-session": sessionToken,
          },
        }
      )
      .then((response) => {
        console.log("User updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  return <CyanGlowButton title="Update User" event={updateUser} />;
}
