import Landing from "./Landing";
import Login from "../login/Login";
import { usePrivy } from "@privy-io/expo";
import { Animated, View } from "react-native";
import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useUserDatabase } from "@/contexts/userContext";

export default function Conditional({ navigation }: any) {
  const { user, logout } = usePrivy();
  const { userDatabase } = useUserDatabase();
  const [DBsatisfied, setDBsatisfied] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2500);
    if (!user && !userDatabase) {
      setDBsatisfied(false);
    }
  }, [user, fadeAnim]);
  return (
    <SuperParent>
      <Parent style={{ opacity: fadeAnim }}>
        {user && DBsatisfied ? (
          <Landing navigation={navigation} />
        ) : (
          <Login navigation={navigation} setDBsatisfied={setDBsatisfied} />
        )}
      </Parent>
    </SuperParent>
  );
}
const SuperParent = styled(View)`
  display: flex;
  width: 100%;
  height: 100%;
  background: #000;
`;
const Parent = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
