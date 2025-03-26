import { PrismUser } from "@/interfaces/user";

export default function userAuthPayloadSanitizer(payload): PrismUser {
  const createdAt = payload?.created_at;
  const privyId = payload?.id;
  const email =
    payload?.linked_accounts[0].email ||
    payload?.linked_accounts[0].address ||
    "not_available";
  const username =
    payload?.linked_accounts[0].username ||
    payload.linked_accounts[0].email.split("@")[0] ||
    payload.linked_accounts[0].address.split("@")[0] ||
    "not_available";
  const type = payload?.linked_accounts[0].type;
  const walletSigner = Math.random().toFixed(20).toString().replace(".", "x");
  const avatarId =
    payload?.linked_accounts[0]?.profile_picture_url ||
    `https://avatar.iran.liara.run/public/boy?username=${
      username || email.split("@")[0]
    }`;

  const sanitizedObject = {
    createdAt,
    privyId,
    email,
    username,
    type,
    walletSigner,
    avatarId,
  };
  console.log("🟩 userAuthPayloadSanitizer");
  console.log(sanitizedObject);

  return sanitizedObject;
}
