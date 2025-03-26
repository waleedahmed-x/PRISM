import axios from "axios";

export default async function updateUser(
  userId: string,
  field: string,
  value: any
) {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_BACKEND_ENDPOINT}/api/update?privyId=${userId}`,
      {
        field,
        value,
      }
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
}
