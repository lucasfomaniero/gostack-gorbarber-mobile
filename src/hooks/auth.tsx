import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

interface UserData {
  user: Record<string, unknown>;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserData>({} as UserData);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);
      if (user[1] && token[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async (email, password) => {
    const response = await api.post<UserData>('/sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    if (user && token) {
      await AsyncStorage.multiSet([
        ['@GoBarber:user', JSON.stringify(user)],
        ['@GoBarber:token', token],
      ]);
      setData({ user, token });
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as UserData);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user: data.user,
          signIn,
          signOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an Provider.');
  }

  return context;
}

export { AuthProvider, useAuth };
