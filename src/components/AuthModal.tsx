import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toast = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      let error = null;

      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        error = signUpError;
      }

      if (error) {
        setErrorMsg(error.message);
      } else {
        toast({
          title: 'Conta conectada!',
          description: 'Faça o download do app para acessar as salas.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white" borderRadius="xl">
        <ModalHeader>{isLogin ? 'Fazer Login' : 'Criar Conta'}</ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleAuth}>
          <ModalBody>
            <VStack spacing={4}>
              {errorMsg && (
                <Alert status="error" borderRadius="md" bg="red.900" color="white">
                  <AlertIcon color="red.400" />
                  {errorMsg}
                </Alert>
              )}

              <FormControl isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.700"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.700"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter display="flex" flexDirection="column" gap={3}>
            <Button
              colorScheme="blue"
              width="full"
              type="submit"
              isLoading={isLoading}
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
            
            <Text fontSize="sm" color="gray.400">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <Button
                variant="link"
                color="blue.400"
                onClick={toggleMode}
                size="sm"
              >
                {isLogin ? 'Criar Conta' : 'Fazer Login'}
              </Button>
            </Text>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
