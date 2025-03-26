import { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export default function LoginModal({
  setShow,
  code = "",
  setCode,
  loginWithCode,
  email,
}: {
  setShow: (x: boolean) => void;
  code: string;
  setCode: (code: string) => void;
  loginWithCode: (params: { code: string; email: string }) => void;
  email: string;
}) {
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = code.split("");
    newCode[index] = text;
    const updatedCode = newCode.join("");
    setCode(updatedCode);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (updatedCode.length === 6) {
      loginWithCode({ code: updatedCode, email });
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <ModalParent>
      <Close onPress={() => setShow(false)}>
        <CloseContent>x</CloseContent>
      </Close>
      <OTPContainer>
        <Title>Enter OTP</Title>
        <Horizontal>
          {Array.from({ length: 6 }).map((_, index) => (
            <OTPInput
              key={index}
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              value={code[index] || ""}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="numeric"
              textAlign="center"
            />
          ))}
        </Horizontal>
      </OTPContainer>
    </ModalParent>
  );
}
const ModalParent = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 150%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #000000dc;
`;
const Close = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  right: 20px;
`;
const CloseContent = styled(Text)`
  color: #fff;
  font-size: 30px;
`;

const OTPContainer = styled(View)`
  width: 80%;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled(Text)`
  width: 100%;
  color: #fff;
  font-size: 30px;
  margin: 100px 0px;
  margin-top: 200px;
  text-align: center;
`;
const Horizontal = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
const OTPInput = styled(TextInput)`
  width: 40px;
  height: 40px;
  color: #fff;
  margin: 0 5px;
  font-size: 18px;
  border-width: 2px;
  border-radius: 8px;
  border-color: #9c83ff;
  background-color: #1f1f1faa;
`;
