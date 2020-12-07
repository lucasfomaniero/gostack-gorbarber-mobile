import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  LoginContainer,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { useAuth } from '../../hooks/auth';

interface LoginData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { user, signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const handleSignIn = useCallback(async (data: LoginData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await signIn(data.email, data.password);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getErrorsValidation(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro na autenticação. Tente novamente.',
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <LoginContainer>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </LoginContainer>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
