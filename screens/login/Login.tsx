import LoginModal from "./LoginModal";
import styled from "styled-components/native";
import { Button, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useAlert } from "@/contexts/alertContext";
import { SocialButton } from "@/components/ui/Buttons";
import { useEncryption } from "@/contexts/encryptionContext";
import { SafeAreaView, StatusBar, View, TextInput } from "react-native";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import { useLoginWithEmail, useLoginWithOAuth, usePrivy } from "@privy-io/expo";
import handleDBAuth from "@/utils/AuthHandler";
import { useUser } from "@/contexts/authContext";

export default function Login({ navigation, setDBsatisfied }) {
  const [code, setCode] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const { user, getAccessToken, logout } = usePrivy();
  const { encryptMessage, setJWT } = useEncryption();
  const { loginGlobal } = useUser();

  useEffect(() => {
    user && loginGlobal(user);
    setDBsatisfied(user);
  }, []);

  const { login: OAuthLogin } = useLoginWithOAuth({
    async onSuccess(user, isNewUser) {
      showAlert("success", "Login Success");
      setCode("");
      const accessToken = await getAccessToken();
      setJWT(accessToken);
      encryptMessage(user?.id);
      const authed = handleDBAuth(user, showAlert, logout, loginGlobal);
      authed && setDBsatisfied(true);
    },
    onError(error) {
      console.log(String(error));
      console.log(error);
    },
  });

  const { loginWithCode, sendCode, state } = useLoginWithEmail({
    async onLoginSuccess(_user, _isNewUser) {
      showAlert("success", "Login Success");
      setCode("");
      const accessToken = await getAccessToken();
      setJWT(accessToken);
      encryptMessage(_user?.id);
      const authed = handleDBAuth(_user, showAlert, logout, loginGlobal);
      authed && setDBsatisfied(true);
    },
    onError(err) {
      if (err.message.includes("Invalid email address")) {
        showAlert("error", "Invalid email address");
      } else if (err.message.includes("Verification code must have 6 digits")) {
        showAlert("error", "Verification code must have 6 digits.");
      } else {
        showAlert("error", err.message);
      }
    },
  });

  useEffect(() => {
    user && setDBsatisfied(true);
  }, [user]);

  useEffect(() => {
    state.status === "awaiting-code-input" &&
      showAlert("loading", "Waiting for code input");
    if (state.status === "sending-code") {
      showAlert("loading", "Sending code to your email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, navigation]);

  return (
    <SuperParent>
      <SafeAreaView style={{ backgroundColor: "#000" }}>
        <StatusBar backgroundColor="#000" />
        <AnimatedBackground />
        <LoginParent>
          <Title>Signup</Title>
          <InputCodeButton>
            <StyledTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              inputMode="email"
              autoCapitalize="none"
              placeholderTextColor="#fff"
            />
            <SendCodeButton
              disabled={!/\S+@\S+\.\S+/.test(email)}
              onPress={async () => {
                await sendCode({ email });
                setShowLoginModal(true);
              }}
            >
              <SendCodeButtonTitle disabled={!/\S+@\S+\.\S+/.test(email)}>
                Send Code
              </SendCodeButtonTitle>
            </SendCodeButton>
          </InputCodeButton>
          <SocialButton
            event={() =>
              OAuthLogin({
                provider: "google",
                redirectUri: "https://auth.privy.io/api/v1/oauth/callback",
              })
            }
            title="Signin with Google"
            imgSrc={require("@assets/icons/google-icon.png")}
          />
          <SocialButton
            event={() => OAuthLogin({ provider: "twitter" })}
            title="Signin with Twitter"
            imgSrc={require("@assets/icons/twitter-icon.png")}
          />
          <SocialButton
            event={() =>
              OAuthLogin({
                provider: "discord",
                redirectUri: "https://auth.privy.io/api/v1/oauth/callback",
              })
            }
            title="Signin with Discord"
            imgSrc={require("@assets/icons/discord-icon.png")}
          />
          <TNC>
            <TNCtext>
              By signing up, you are agreeing to Rainmakers{" "}
              <TNCblue> Terms of Service </TNCblue> and
              <TNCblue> Privacy Policy </TNCblue>
            </TNCtext>
          </TNC>
        </LoginParent>
        {state.status === "awaiting-code-input" && showLoginModal && (
          <LoginModal
            setShow={setShowLoginModal}
            code={code}
            setCode={setCode}
            loginWithCode={loginWithCode}
            email={email}
          />
        )}
      </SafeAreaView>
    </SuperParent>
  );
}

const SuperParent = styled(View)`
  display: flex;
  width: 100%;
  height: 100%;
`;
const LoginParent = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 50px;
  font-size: 40px;
`;
const StyledTextInput = styled(TextInput)`
  background-color: transparent;
  border: 0.5px solid #aaa;
  height: 60px;
  border-radius: 50px;
  color: #fff;
  width: 90%;
  padding-left: 20px;
`;
const InputCodeButton = styled(View)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
const SendCodeButton = styled(Button)`
  position: absolute;
  top: 7.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  right: 28px;
  background-color: ${({ disabled }) => (disabled ? "#997fff51" : "#997fffdc")};
  border-radius: 50px;
`;
const SendCodeButtonTitle = styled(Text)`
  color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
  font-weight: 700;
`;
const TNC = styled(View)`
  display: flex;
  width: 90%;
  margin-top: 20px;
`;
const TNCtext = styled(Text)`
  text-align: center;
  line-height: 24px;
  color: #fff;
`;
const TNCblue = styled(Text)`
  color: #997fffdc;
`;
