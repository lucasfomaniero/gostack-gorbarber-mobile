import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 60px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #ff9000;
  margin-top: 8px;
  border: 2px solid #ff9000;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #312e38;
`;
