import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, VStack, Heading, Text, Button, Icon, Spinner, Flex } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';

export default function InviteRoute() {
  const { serverId } = useParams();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!serverId) return;

    // 1. Tenta abrir o deep link nativo
    window.location.href = `cuicall://invite/${serverId}`;

    // 2. Fallback: Se após 2.5s a aba não foi minimizada/escondida, mostra o botão de download
    const timer = setTimeout(() => {
      if (!document.hidden) {
        setShowFallback(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [serverId]);

  if (!showFallback) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.900" flexDir="column" gap={4}>
        <Spinner size="xl" color="blue.400" thickness="4px" />
        <Text color="gray.400">Abrindo CuiCall...</Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg="gray.900" py={20}>
      <Container maxW="container.md">
        <VStack
          spacing={8}
          p={{ base: 8, md: 14 }}
          borderRadius="2xl"
          textAlign="center"
          bg="whiteAlpha.50"
          border="1px solid"
          borderColor="whiteAlpha.100"
          backdropFilter="blur(12px)"
          boxShadow="0 25px 60px rgba(0,0,0,0.3), 0 0 80px rgba(66,153,225,0.08)"
        >
          <VStack spacing={3}>
            <Heading size="lg" fontWeight="extrabold" color="white">
              Você foi convidado para um servidor!
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Parece que você não tem o CuiCall instalado.
            </Text>
          </VStack>
          
          <Button
            as="a"
            href="/download/CuiCall_0.1.0_x64-setup.exe"
            size="lg"
            colorScheme="blue"
            px={10}
            py={7}
            fontSize="lg"
            fontWeight="bold"
            leftIcon={<Icon as={FaDownload} />}
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '0 10px 40px rgba(66,153,225,0.4)'
            }}
            transition="all 0.25s"
          >
            Baixar CuiCall (Windows)
          </Button>
          
          <Text fontSize="sm" color="gray.500">
            Após instalar, clique no link de convite novamente.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
