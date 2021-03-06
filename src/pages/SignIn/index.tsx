import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background, AnimatedContainer } from './styles';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatorio')
            .email('Digite um email valido'),
          password: Yup.string().required('Senha obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autentição',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );
  return (
    <>
      <Container>
        <Content>
          <AnimatedContainer>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Logon</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Button type="submit">Entrar</Button>
              <Link to="forgot">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar Conta
            </Link>
          </AnimatedContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
