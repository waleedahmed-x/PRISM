import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { Linking } from "react-native";
import { HeaderBack } from "@/components/header/Header";
import { PurpleThemeButton } from "@/components/ui/Buttons";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import styled from "styled-components/native";
import { useEmbeddedWallet } from "@privy-io/expo";
import { useUserDatabase } from "@/contexts/userContext";
import { useChainContext } from "@/contexts/chainContext";

export default function Profile({ navigation }: any) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [myDuelBalance, setMyDuelBalance] = useState(0);
  const { userDatabase } = useUserDatabase();
  const chainContext = useChainContext();
  let username = userDatabase?.username;
  const wallet = useEmbeddedWallet();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     if (wallet.account.address) {
  //       try {
  //         const balance = await chainContext.readerContracts[
  //           'DUEL'
  //         ][1].balanceOf(wallet.account.address)
  //         const parsedBalance = parseFloat(
  //           Number(BigInt(balance) / BigInt(10 ** 15) / 1000n).toFixed(3)
  //         )
  //         setMyDuelBalance(parsedBalance)
  //       } catch (error) {
  //         console.error('Failed to fetch balance:', error)
  //       }
  //     }
  //   }

  //   fetchBalance()
  // }, [wallet.account.address, chainContext.readerContracts])

  return (
    <Parent>
      <HeaderBack
        navigation={navigation}
        navigateTo="Prism Arcade"
        screenTitle="Profile"
        custom
        element={<HeadTools navigation={navigation} />}
      />

      <>
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <ModalBackdrop>
            <ModalContent>
              <QRCode value={wallet.account.address} size={200} />
              <Text style={{ textAlign: "center" }}>
                Scan the above QR code to deposit funds on any EVM chain!
              </Text>
              <PurpleThemeButton icon title="Close" event={toggleModal} />
            </ModalContent>
          </ModalBackdrop>
        </Modal>
      </>

      <ScrollView style={{ width: "95%", flex: 1 }}>
        <HeroView>
          <RingImage source={require("@assets/icons/rings.png")} />
          <Avatar
            style={{ borderRadius: 100 }}
            source={
              userDatabase?.avatarId
                ? { uri: userDatabase.avatarId }
                : require("@assets/icons/avatar.png")
            }
          />
          <NameTitle>{userDatabase?.username || username}</NameTitle>
        </HeroView>
        <CenterContainer>
          <SalesRep>
            <SalesRepContent>
              <Title>Invite a friend and get paid</Title>
              <Refer>
                Users receive 5% of all challenge winnings from users they
                invite
              </Refer>
            </SalesRepContent>
            <ReferButton
              onPress={() => {
                Clipboard.setString(
                  `https://arcade.prism.ai/?ref=${
                    userDatabase.privyId.split(":")[2]
                  }`
                );
                Alert.alert("Referral link copied to clipboard!");
              }}
            >
              <Image source={require("@assets/icons/arrow-right.png")} />
            </ReferButton>
          </SalesRep>
          <AccountWallet>
            <AccountWalletTitle>Account & Wallet</AccountWalletTitle>
          </AccountWallet>
          <SalesRep>
            <SalesRepContent>
              <Title>Connected Wallet</Title>
              <Refer>{wallet.account.address || "No wallet connected"}</Refer>
            </SalesRepContent>
            <ReferButton
              onPress={() => {
                Clipboard.setString(wallet.account.address || "");
                Alert.alert("Wallet address copied to clipboard!");
              }}
            >
              <Image source={require("@assets/icons/arrow-right.png")} />
            </ReferButton>
          </SalesRep>
          <RainCoinsParent>
            <RainCoinsContent>
              <RainTitle>Balance</RainTitle>
              <RainCoins>{myDuelBalance.toLocaleString()} DUEL</RainCoins>
            </RainCoinsContent>
            <PurpleThemeButton icon title="Receive DUEL" event={toggleModal} />
            <PurpleThemeButton
              icon
              title="Buy DUEL"
              event={() => {
                const url =
                  "https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x943af2ece93118b973c95c2f698ee9d15002e604";
                Linking.openURL(url).catch((err) =>
                  console.error("Couldn't load page", err)
                );
              }}
            />
          </RainCoinsParent>
          <WiningsParent style={{ display: "none" }}>
            <WiningsContent>
              <WiningsTitle>Winings</WiningsTitle>
              <Winings>0.00 DUEL</Winings>
              <WiningsDescription>~$0.00 USD</WiningsDescription>
            </WiningsContent>
            <PurpleThemeButton
              icon
              title="Claim"
              event={() => Alert.alert("Under Development")}
            />
          </WiningsParent>
          {userDatabase?.recentGames && userDatabase.recentGames.length > 0 && (
            <RecentGamesParent>
              <RecentGamesTitle>Recent Games</RecentGamesTitle>
              {userDatabase.recentGames.map((game, index) => (
                <GameItem key={index}>
                  <WiningsTitle>{game}</WiningsTitle>
                  <ToolImage
                    source={require("@assets/icons/arrow-right.png")}
                  />
                </GameItem>
              ))}
            </RecentGamesParent>
          )}
          {userDatabase?.recentChallenges &&
            userDatabase.recentChallenges.length > 0 && (
              <RecentGamesParent>
                <RecentGamesTitle>Recent Challenges</RecentGamesTitle>
                {userDatabase.recentChallenges.map((challenge, index) => (
                  <GameItem key={index}>
                    <WiningsTitle>{challenge}</WiningsTitle>
                  </GameItem>
                ))}
              </RecentGamesParent>
            )}
          {/* <SalesRep>
            <SalesRepContent>
              <Title>Linked Account</Title>
              <Refer>Link a game account to begin playing!</Refer>
            </SalesRepContent>
            <ReferButton onPress={() => Alert.alert('Under Development')}>
              <Image source={require('@assets/icons/link.png')} />
            </ReferButton>
          </SalesRep> */}
        </CenterContainer>
      </ScrollView>
    </Parent>
  );
}
function HeadTools({ navigation }) {
  return (
    <ToolsParent>
      <Touch onPress={() => navigation.navigate("Edit Profile")}>
        <ToolImage source={require("@assets/icons/pencil-edit.png")} />
      </Touch>
      <Touch onPress={() => navigation.navigate("Profile Settings")}>
        <ToolImage source={require("@assets/icons/settings.png")} />
      </Touch>
      <Touch onPress={() => Alert.alert("Under Development")}>
        <ToolImage source={require("@assets/icons/share.png")} />
      </Touch>
    </ToolsParent>
  );
}
const ModalBackdrop = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 80%;
  padding: 20px;
  background-color: #9c83ffee;
  border-radius: 10px;
  gap: 20px;
  align-items: center;
`;
const RecentGamesParent = styled(View)`
  display: flex;
  flex-direction: column;
  width: 95%;
  border: 1px solid #aaa;
  border-radius: 30px;
  margin-top: 30px;
  padding: 20px;
`;
const RecentGamesTitle = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
`;
const GameItem = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #ccc;
  margin-bottom: 15px;
`;
const Parent = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #000;
`;
const HeroView = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CenterContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const RingImage = styled(Image)`
  position: absolute;
  top: 0px;
`;
const Avatar = styled(Image)`
  margin-top: 150px;
  height: 140px;
  width: 140px;
  margin-bottom: 10px;
`;
const NameTitle = styled(Text)`
  font-size: 30px;
  font-weight: 600;
  color: #fff;
`;
const WiningsParent = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border: 1px solid #aaa;
  border-radius: 30px;
  /* height: 190px; */
  margin-top: 30px;
`;
const WiningsContent = styled(View)`
  width: 90%;
  padding: 20px 10px;
`;
const WiningsTitle = styled(Text)`
  text-align: start;
  font-size: 18px;
  color: #ccc;
  width: 90%;
`;
const Winings = styled(Text)`
  font-size: 25px;
  color: white;
  text-align: start;
  font-weight: 800;
  width: 100%;
  padding-top: 10px;
`;
const WiningsDescription = styled(Text)`
  color: #aaa;
  font-size: 14px;
  margin-top: 5px;
`;
const RainCoinsParent = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border: 1px solid #aaa;
  border-radius: 30px;
  /* height: 190px; */
  margin-top: 30px;
`;
const RainCoinsContent = styled(View)`
  width: 90%;
  padding: 20px 10px;
`;
const RainTitle = styled(Text)`
  text-align: start;
  font-size: 18px;
  color: #ccc;
  width: 90%;
`;
const RainCoins = styled(Text)`
  font-size: 25px;
  color: white;
  text-align: start;
  font-weight: 800;
  width: 100%;
  padding-top: 10px;
`;
const AccountWallet = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 95%;
  margin-top: 20px;
`;
const AccountWalletTitle = styled(Text)`
  font-size: 30px;
  color: #fff;
`;
const SalesRep = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border-radius: 25px;
  padding: 5px;
  border: 0.5px solid #aaa;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const SalesRepContent = styled(View)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Title = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
  padding-top: 5px;
`;
const Refer = styled(Text)`
  color: #ccc;
  font-size: 13px;
  padding-left: 20px;
  padding-top: 3px;
`;
const ReferButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9c83ff;
  border-radius: 20px;
  width: 55px;
  height: 55px;
`;
const ToolsParent = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ToolImage = styled(Image)`
  margin: 0px 8px;
`;
const Touch = styled(TouchableOpacity)``;
