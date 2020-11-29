import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex-direction: row;
  border: 2px solid #232129;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  align-items: center;
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 0 8px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
  color: #666360;
`;
