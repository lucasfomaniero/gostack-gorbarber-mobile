import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { ScrollView } from 'react-native-gesture-handler';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  LoginContainer,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';
import getErrorsValidation from '../../utils/getErrorsValidation';

interface InputProps {
  onFocus: void;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const handleFormSubmit = useCallback(async (data: UserData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .required('O e-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(
          6,
          'A senha deve conter o mínimo de 6 dígitos',
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // await api.post<UserData>('/users', data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getErrorsValidation(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Erro ao realizar o cadastro',
        'Ocorreu um erro ao realizar o cadastro. Tente novamente.',
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
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <Input
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
                name="name"
                icon="user"
                autoCorrect={false}
                placeholder="Nome"
                autoCompleteType="name"
                autoCapitalize="words"
                returnKeyType="next"
              />
              <Input
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                ref={emailInputRef}
                name="email"
                icon="mail"
                autoCorrect={false}
                placeholder="E-mail"
                autoCompleteType="email"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
              />
              <Input
                ref={passwordInputRef}
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                autoCompleteType="password"
                secureTextEntry
                keyboardType="default"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </LoginContainer>
        </Container>
      </ScrollView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText>Voltar para o login</BackToSignInText>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
