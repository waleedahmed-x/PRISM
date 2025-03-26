import React, { useEffect, useState } from 'react'
import Toggle from '@/components/ui/Toggle'
import styled from 'styled-components/native'
import { HeaderBack } from '@/components/header/Header'
import { useEncryption } from '@/contexts/encryptionContext'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { PurpleThemeButton, RedThemeButton } from '@/components/ui/Buttons'
import { useUserDatabase } from '@/contexts/userContext'
import { usePrivy } from '@privy-io/expo'
import { useUser } from '@/contexts/authContext'

export default function ProfileSettings({ navigation }: any) {
  const { destroyEncryptedEntities } = useEncryption()
  const { user, logout } = usePrivy()
  const {
    userDatabase,
    userNotifications,
    updateUserNotifications,
    deleteUser,
  } = useUserDatabase()
  const { logoutGlobal } = useUser()

  const [isOn, setIsOn] = useState({
    challengeOfTheDay: userNotifications.challengeOfTheDay,
    jackpotWinners: userNotifications.jackpotWinners,
    challengesJoined: userNotifications.challengesJoined,
    friendsChallenges: userNotifications.friendsChallenges,
  })

  useEffect(() => {
    !user && navigation.navigate('Landing')
  }, [user])

  return (
    <Parent>
      <HeaderBack
        navigation={navigation}
        navigateTo="Profile"
        screenTitle="Profile Settings"
      />
      <VectorBG source={require('@assets/images/vector-bg.png')} />
      <CenterContainer>
        <NotificationsContainer>
          <NotificationsTitle>Notifications</NotificationsTitle>
          <NotificationsRadioStack>
            <TitleRadio>Challenge of the day announcement</TitleRadio>
            <Toggle
              isOn={isOn.challengeOfTheDay}
              setIsOn={() =>
                setIsOn({ ...isOn, challengeOfTheDay: !isOn.challengeOfTheDay })
              }
            />
          </NotificationsRadioStack>
          <NotificationsRadioStack>
            <TitleRadio>Jackpot winners</TitleRadio>
            <Toggle
              isOn={isOn.jackpotWinners}
              setIsOn={() =>
                setIsOn({ ...isOn, jackpotWinners: !isOn.jackpotWinners })
              }
            />
          </NotificationsRadioStack>
          <NotificationsRadioStack>
            <TitleRadio>Challenges you've joined</TitleRadio>
            <Toggle
              isOn={isOn.challengesJoined}
              setIsOn={() =>
                setIsOn({ ...isOn, challengesJoined: !isOn.challengesJoined })
              }
            />
          </NotificationsRadioStack>
          <NotificationsRadioStack>
            <TitleRadio>Challenges your friends have joined</TitleRadio>
            <Toggle
              isOn={isOn.friendsChallenges}
              setIsOn={() =>
                setIsOn({ ...isOn, friendsChallenges: !isOn.friendsChallenges })
              }
            />
          </NotificationsRadioStack>
        </NotificationsContainer>
        <ManageAccount>
          <PurpleThemeButton
            title="Save Changes"
            disabled={!user}
            event={async () => {
              try {
                await updateUserNotifications({ ...userNotifications, ...isOn })
                Alert.alert(
                  'Success',
                  'Your notification settings have been updated.'
                )
              } catch (error) {
                Alert.alert(
                  'Error',
                  'There was an error updating your notification settings.'
                )
              }
            }}
          />
          <PurpleThemeButton
            title="Sign Out"
            disabled={!user}
            event={() => {
              Alert.alert(
                'Confirm Signout',
                'Are you sure you want to signout?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      await logout()
                      logoutGlobal()
                      destroyEncryptedEntities()
                    },
                  },
                ],
                { cancelable: false }
              )
            }}
          />
          <RedThemeButton
            disabled={!user}
            title="Delete My Account"
            event={() => {
              Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete? This action will delete your account permanently!',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      deleteUser()
                      await logout()
                    },
                  },
                ],
                { cancelable: false }
              )
            }}
          />
        </ManageAccount>
      </CenterContainer>
    </Parent>
  )
}
const Parent = styled(View)`
  position: relative;
  background: #000;
  height: 100%;
`
const VectorBG = styled(Image)`
  position: absolute;
  left: 0px;
  top: 100px;
`
const CenterContainer = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`
const NotificationsContainer = styled(View)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`
const NotificationsTitle = styled(Text)`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  padding-left: 20px;
`

const NotificationsRadioStack = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 30px 20px 0px 20px;
`
const TitleRadio = styled(Text)`
  color: #fff;
  font-weight: 500;
  font-size: 16px;
`
const ManageAccount = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`
