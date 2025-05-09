import axios from "axios";

import userAuthPayloadSanitizer from "@/sanitizers/userAuthPayloadSanitizer";

export default async function handleDBAuth(
  user: any,
  showAlert: (type: string, message: string) => void,
  logout: any,
  loginGlobal: any
  // logoutGlobal: any
) {
  const payload = userAuthPayloadSanitizer(user);

  try {
    const response = await axios.post(`http://localhost:8080/api/auth`, {
      ...payload,
    });
    const userSanitizedObject = userAuthPayloadSanitizer(user);
    loginGlobal(userSanitizedObject);

    const statusCode = response.status;

    if (["400", "404", "409", "500"].includes(statusCode.toString())) {
      async () => await logout();
      showAlert("error", "Failed please retry");
      return false;
    }

    return true;
  } catch (error) {
    // logoutGlobal();
    showAlert("error", "Failed to save, please retry");
    console.log(error);
    logout();
    return false;
  }
}
