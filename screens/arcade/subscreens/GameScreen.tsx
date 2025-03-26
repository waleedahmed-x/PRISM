import WebView from "react-native-webview";
import styled from "styled-components/native";
import injectedJavaScript from "@/utils/Injection";
import React, { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/gameContext";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEncryption } from "@/contexts/encryptionContext";
export default function Game({ navigation }: any) {
  const { selectedGame } = useGameContext();
  const { encryptedMessage, jwt } = useEncryption();
  setTimeout(() => {
    console.log(encryptedMessage, jwt);
    console.log(selectedGame.url);
  }, 1000);

  const [hidden, setHidden] = useState(false);
  const handleToogle = () => {
    setHidden(!hidden);
    setTimeout(() => {
      setHidden(false);
    }, 2000);
  };
  useEffect(() => {
    if (selectedGame.orientation === "landscape") {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#000" }}>
      <Parent>
        {hidden ? (
          <BackButton onPress={() => navigation.navigate("Prism Arcade")}>
            <Image source={require("@assets/icons/arrow-left.png")} />
          </BackButton>
        ) : (
          <ToggleBar onPress={handleToogle}>
            <Bar />
          </ToggleBar>
        )}
        <WebView
          originWhitelist={["*"]}
          // source={{
          //   uri: "http://54.85.218.15/MergeTheGemsMobile",
          // }}
          source={{
            uri: `${selectedGame.url}?user=${jwt}&challenge=${encryptedMessage}`,
          }}
          javaScriptEnabled
          incognito
          injectedJavaScript={injectedJavaScript}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1 }}
          onMessage={() => {}}
        />
      </Parent>
    </SafeAreaView>
  );
}
const Parent = styled(View)`
  background-color: #000;
  width: 100%;
  height: 100%;
`;
const BackButton = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 100;
  background-color: #000;
  border-radius: 50px;
`;

const ToggleBar = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 100;
`;
const Bar = styled(View)`
  width: 10px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #515151;
`;
