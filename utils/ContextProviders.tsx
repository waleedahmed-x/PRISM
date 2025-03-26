import React from "react";
import { AlertProvider } from "@/contexts/alertContext";
import { GameProvider } from "@/contexts/gameContext";
import { UserProvider } from "@/contexts/authContext";
import { EncryptionProvider } from "@/contexts/encryptionContext";
import { DatabaseUserProvider } from "@/contexts/userContext";

export default function ContextProviders({ children }: any) {
  return (
    <UserProvider>
      <DatabaseUserProvider>
        <EncryptionProvider>
          <AlertProvider>
            <GameProvider>{children}</GameProvider>
          </AlertProvider>
        </EncryptionProvider>
      </DatabaseUserProvider>
    </UserProvider>
  );
}
