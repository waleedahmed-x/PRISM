import axios from "axios";

const useDeleteUser = async (userId: string) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/delete?privyId=${userId}`
    );
    if (response.status === 200) {
      console.log("Update successful");
      return response.data.message;
    } else {
      throw new Error("Failed to update user");
    }
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export default useDeleteUser;
