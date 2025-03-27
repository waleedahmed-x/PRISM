import React from "react";
import { AlertProvider } from "@/contexts/alertContext";
import { GameProvider } from "@/contexts/gameContext";
import { UserProvider } from "@/contexts/authContext";
import { EncryptionProvider } from "@/contexts/encryptionContext";
import { DatabaseUserProvider } from "@/contexts/userContext";
import { GamesProvider } from "@/contexts/gamesContext";

export default function ContextProviders({ children }: any) {
  return (
    <UserProvider>
      <DatabaseUserProvider>
        <EncryptionProvider>
          <GamesProvider>
            <AlertProvider>
              <GameProvider>{children}</GameProvider>
            </AlertProvider>
          </GamesProvider>
        </EncryptionProvider>
      </DatabaseUserProvider>
    </UserProvider>
  );
}
