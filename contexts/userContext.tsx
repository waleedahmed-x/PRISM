import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { usePrivy } from "@privy-io/expo";
import { PrismUser } from "@/interfaces/user";
import {
  UserNotifications,
  defaultUserNotifications,
} from "@/interfaces/notifications";

interface UserContextType {
  userDatabase: PrismUser | null;
  userNotifications: UserNotifications;
  updateUserNotifications: (notifications: UserNotifications) => Promise<void>;
  loading: boolean;
  error: any;
  fetchFreshUser: () => Promise<void>;
  deleteUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const DatabaseUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: privyUser } = usePrivy();
  const privyId = privyUser?.id;

  const [currentUser, setCurrentUser] = useState<PrismUser | null>(null);
  const [userNotifications, setUserNotifications] = useState(
    defaultUserNotifications
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // Fetch user function
  const fetchUser = useCallback(async () => {
    if (!privyId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/user?privyId=${privyId}`
      );
      setCurrentUser(response.data.user);
      setError(null);
    } catch (error) {
      setError(error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [privyId]);

  const fetchUserNotifications = useCallback(async () => {
    if (!privyId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/notifications?privyId=${privyId}`
      );
      setUserNotifications(response.data.notifications);
      setError(null);
    } catch (error) {
      setError(error);
      setUserNotifications(defaultUserNotifications);
    } finally {
      setLoading(false);
    }
  }, [privyId]);

  const updateUserNotifications = useCallback(
    async (notifications: UserNotifications) => {
      if (!privyId) return;

      setLoading(true);
      try {
        await axios.put(
          `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/notifications?privyId=${privyId}`,
          { notifications }
        );
        setUserNotifications(notifications);
        setError(null);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [privyId]
  );

  const deleteUser = useCallback(async () => {
    if (!privyId) return;

    setLoading(true);
    try {
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/delete?privyId=${privyId}`
      );
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [privyId]);

  useEffect(() => {
    if (privyId) {
      fetchUser();
      fetchUserNotifications();
    }
  }, [privyId, fetchUser]);

  return (
    <UserContext.Provider
      value={{
        userDatabase: currentUser,
        userNotifications,
        updateUserNotifications,
        loading,
        error,
        fetchFreshUser: fetchUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserDatabase = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserDatabase must be used within a DatabaseUserProvider"
    );
  }
  return context;
};
