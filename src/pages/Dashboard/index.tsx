import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const DashBoard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <ActivityIndicator size={40} color="#909090" /> */}
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
};

export default DashBoard;
