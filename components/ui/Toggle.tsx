import React, { useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export default function Toggle({ isOn, setIsOn }) {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0))

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
    setIsOn()
  }

  const toggleColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7b7a7a25', '#9C83FF'],
  })

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  })

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <SwitchContainer style={{ backgroundColor: toggleColor }}>
        <Thumb style={{ transform: [{ translateX }] }} />
      </SwitchContainer>
    </TouchableOpacity>
  )
}

const SwitchContainer = styled(Animated.View)`
  width: 50px;
  height: 30px;
  border-radius: 15px;
  padding: 2px;
  justify-content: center;
  border: 1px solid #303030;
`

const Thumb = styled(Animated.View)`
  width: 23px;
  height: 23px;
  border-radius: 13px;
  background-color: white;
`
