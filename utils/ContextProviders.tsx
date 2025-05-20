import React from "react";
import { GameProvider } from "@/contexts/gameContext";
import { UserProvider } from "@/contexts/authContext";
import { AlertProvider } from "@/contexts/alertContext";
import { GamesProvider } from "@/contexts/gamesContext";
import { StatsProvider } from "@/contexts/lootboxStats";
import { LootboxAuthProvider } from "@/contexts/lootboxAuth";
import { DatabaseUserProvider } from "@/contexts/userContext";
import { EncryptionProvider } from "@/contexts/encryptionContext";

export default function ContextProviders({ children }: any) {
  return (
    <UserProvider>
      <DatabaseUserProvider>
        <EncryptionProvider>
          <GamesProvider>
            <AlertProvider>
              <LootboxAuthProvider>
                <StatsProvider>
                  <GameProvider>{children}</GameProvider>
                </StatsProvider>
              </LootboxAuthProvider>
            </AlertProvider>
          </GamesProvider>
        </EncryptionProvider>
      </DatabaseUserProvider>
    </UserProvider>
  );
}
