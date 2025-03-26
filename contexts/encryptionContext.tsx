import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

interface EncryptionContextType {
  encryptMessage: (message: string) => string | null;
  encryptedMessage: string | null;
  setJWT: (jwt: string) => void;
  jwt: string | null;
  destroyEncryptedEntities: () => void;
}

const EncryptionContext = createContext<EncryptionContextType | null>(null);

interface EncryptionProviderProps {
  children: ReactNode;
}

export const EncryptionProvider: React.FC<EncryptionProviderProps> = ({
  children,
}) => {
  const [encryptedMessage, setEncryptedMessage] = useState<string | null>(null);
  const [jwt, setJWTState] = useState<string | null>(null);

  const setEncryptedMessagePersist = async (message: string | null) => {
    setEncryptedMessage(message);
    if (message) {
      await AsyncStorage.setItem("encryptedMessage", message);
    } else {
      await AsyncStorage.removeItem("encryptedMessage");
    }
  };

  const setJWTPersist = async (token: string) => {
    setJWTState(token);
    if (token) {
      await AsyncStorage.setItem("jwt", token);
    } else {
      await AsyncStorage.removeItem("jwt");
    }
  };

  const encryptMessage = (message: string): string | null => {
    const key = process.env.EXPO_PUBLIC_CRYPTO_SECRET;
    if (message && key) {
      const aesKey = CryptoJS.SHA256(key);
      const iv = CryptoJS.lib.WordArray.random(16);

      const encrypted = CryptoJS.AES.encrypt(message, aesKey, {
        iv,
      }).toString();

      const encryptedValue = `${iv.toString(CryptoJS.enc.Hex)}:${encrypted}`;
      setEncryptedMessagePersist(encryptedValue);
      return encryptedValue;
    }
    return null;
  };

  const destroyEncryptedEntities = async () => {
    await AsyncStorage.removeItem("jwt");
    await AsyncStorage.removeItem("encryptedMessage");
    setJWTState(null);
    setEncryptedMessage(null);
  };

  useEffect(() => {
    const loadStoredValues = async () => {
      const storedJWT = await AsyncStorage.getItem("jwt");
      const storedEncryptedMessage = await AsyncStorage.getItem(
        "encryptedMessage"
      );

      if (storedJWT) setJWTState(storedJWT);
      if (storedEncryptedMessage) setEncryptedMessage(storedEncryptedMessage);
    };

    loadStoredValues();
  }, []);

  return (
    <EncryptionContext.Provider
      value={{
        encryptMessage,
        encryptedMessage,
        setJWT: setJWTPersist,
        jwt,
        destroyEncryptedEntities,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
};

export const useEncryption = (): EncryptionContextType => {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error("useEncryption must be used within an EncryptionProvider");
  }
  return context;
};
