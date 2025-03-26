import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncLogger = async () => {
  try {
    await AsyncStorage.getItem("jwt");
    await AsyncStorage.getItem("encryptedMessage");
  } catch (error) {
    console.error("Error fetching values from AsyncStorage:", error);
  }
};

export default AsyncLogger;
