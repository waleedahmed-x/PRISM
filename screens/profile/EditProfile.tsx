import React, { useState, useEffect } from "react";
import { HeaderBack } from "@/components/header/Header";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { PurpleThemeButton } from "@/components/ui/Buttons";
import SocialInput from "@/components/ui/SocialInput";
import { useUserDatabase } from "@/contexts/userContext";
import updateUser from "@/hooks/useEditUser";
import { usePrivy } from "@privy-io/expo";
import { useEmbeddedWallet, isNotCreated } from "@privy-io/expo";
import Clipboard from "@react-native-clipboard/clipboard";

export default function EditProfile({ navigation }: any) {
  const { user } = usePrivy();
  const [avatar, setAvatar] = useState(null);
  const { userDatabase, fetchFreshUser } = useUserDatabase();
  const [username, setUsername] = useState(userDatabase?.username || "");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [address, setAddress] = useState("");
  // console.log(userDatabase);

  const wallet = useEmbeddedWallet();
  // useEffect(() => {
  //   const CreateWallet = async () => {
  //     if (isNotCreated(wallet)) {
  //       const w = await wallet.create({ recoveryMethod: "privy" });
  //       // @ts-ignore
  //       setAddress(wallet?.account?.address);
  //     } else {
  //       setAddress(wallet?.account?.address);
  //       console.log(wallet?.account?.address);
  //     }
  //   };

  //   CreateWallet();
  // }, [wallet]);

  useEffect(() => {
    setIsDisabled(username === userDatabase?.username);
  }, [username, userDatabase?.username]);

  const handleUserUpdate = async () => {
    setIsLoading(true);

    try {
      await updateUser(user.id, "bio", bio);
      await updateUser(user.id, "username", username);
      fetchFreshUser();
      Alert.alert("Profile updated successfully!");
    } catch (error) {
      Alert.alert("Failed to update profile", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <Parent>
      <HeaderBack
        navigation={navigation}
        navigateTo="Prism Arcade"
        screenTitle="Edit Profile"
      />
      <ScrollView style={{ width: "95%", flex: 1 }}>
        <HeroView onPress={pickImage}>
          <RingImage source={require("@assets/icons/rings.png")} />
          <Camera source={require("@assets/icons/camera.png")} />
          <Avatar
            // source={require("@assets/icons/avatar.png")}
            source={
              userDatabase?.avatarId
                ? { uri: userDatabase.avatarId }
                : require("@assets/icons/avatar.png")
            }
          />
          <NameTitle>{userDatabase?.username}</NameTitle>
        </HeroView>
        <CenterContainer>
          <InputGroup>
            <Labels>
              <Label>Username</Label>
              <Check>{username?.length || 0}/20 characters</Check>
            </Labels>
            <UsernameInput
              value={username}
              placeholder="Username"
              onChangeText={(input) => {
                if (input.length <= 20) setUsername(input);
              }}
              placeholderTextColor="#aaa"
            />
          </InputGroup>
          <VectorBG source={require("@assets/images/vector-bg.png")} />
          <InputGroup>
            <Labels>
              <Label>Bio</Label>
              <Check>{bio.length}/255 characters</Check>
            </Labels>
            <BioInput
              value={bio}
              multiline
              placeholder="Your gamer bio..."
              placeholderTextColor="#aaa"
              onChangeText={(input) => {
                if (input.length <= 255) setBio(input);
              }}
            />
            <Labels>
              <Label>Embedded Wallet Address</Label>
              <Copy
                onPress={() => {
                  Alert.alert("Address Copied");
                  console.log("copied");

                  Clipboard.setString(wallet.account.address);
                }}
              >
                <Label>Copy Now</Label>
              </Copy>
            </Labels>
            <Address
              value={address || "Loading..."}
              editable={false}
              onChangeText={(input) => {
                if (input.length <= 20) setUsername(input);
              }}
              placeholderTextColor="#aaa"
            />
            {isLoading ? (
              <ActivityIndicator size="large" color="#6200EE" />
            ) : (
              <PurpleThemeButton
                styles={{ marginTop: 30, marginBottom: 30 }}
                title="Save changes"
                event={handleUserUpdate}
                disabled={isDisabled || !username}
              />
            )}
          </InputGroup>
          <SocialLinks style={{ display: "none" }}>
            <Title>Social Links</Title>
            <SocialInput imgSrc={require("@assets/icons/X.png")} />
            <SocialInput imgSrc={require("@assets/icons/Twitch.png")} />
            <SocialInput imgSrc={require("@assets/icons/Discord.png")} />
            <SocialInput imgSrc={require("@assets/icons/Facebook.png")} />
            <SocialInput imgSrc={require("@assets/icons/Instagram.png")} />
            <SocialInput imgSrc={require("@assets/icons/Tiktok.png")} />
          </SocialLinks>
        </CenterContainer>
      </ScrollView>
    </Parent>
  );
}

const Parent = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #000;
`;
const HeroView = styled(TouchableOpacity)`
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
  height: 100%;
`;
const RingImage = styled(Image)`
  position: absolute;
  top: -15px;
  opacity: 0.7;
`;
const Camera = styled(Image)`
  position: absolute;
  top: 62%;
  z-index: 1;
  width: 40px;
  height: 40px;
`;
const Avatar = styled(Image)`
  margin-top: 150px;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const NameTitle = styled(Text)`
  font-size: 30px;
  font-weight: 600;
  color: #fff;
`;
const InputGroup = styled(View)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const Labels = styled(View)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 90%;
`;
const Copy = styled(TouchableOpacity)`
  /* position: absolute; */
  /* top: 42px; */
  /* right: 0px; */
`;
const CopyImage = styled(Image)`
  width: 20px;
  height: 20px;
`;
const Label = styled(Text)`
  color: #fff;
  font-size: 15px;
`;
const Check = styled(Text)`
  color: #aaa;
  font-size: 14px;
`;
const UsernameInput = styled(TextInput)`
  height: 55px;
  border-radius: 25px;
  padding: 0px 20px;
  font-size: 20px;
  color: #fff;
  width: 100%;
  border: 0.5px solid #aaa;
`;
const Address = styled(TextInput)`
  height: 55px;
  border-radius: 25px;
  padding: 0px 20px;
  font-size: 20px;
  color: #fff;
  width: 100%;
  border: 0.5px solid #aaa;
  padding-right: 50px;
`;
const VectorBG = styled(Image)`
  position: absolute;
  left: 0px;
  top: 100px;
`;
const BioInput = styled(TextInput)`
  height: 100px;
  border-radius: 25px;
  padding: 20px;
  font-size: 20px;
  color: #fff;
  width: 100%;
  border: 0.5px solid #aaa;
`;
const SocialLinks = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
const Title = styled(Text)`
  display: flex;
  justify-content: flex-start;
  color: #fff;
  width: 100%;
  font-size: 25px;
  font-weight: 700;
  padding: 30px 0px;
`;
