import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const LoginContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
  font-size: 24px;
  font-weight: 500;
  color: #f4ede8;
  text-align: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 0 ${8 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
`;

export const CreateAccountButtonText = styled.Text`
  margin-left: 16px;
  color: #ff9000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;
