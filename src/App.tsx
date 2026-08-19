import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Stack,
  Badge,
  useDisclosure
} from '@chakra-ui/react';
import {
  FaWindows,
  FaComments,
  FaDesktop,
  FaShieldAlt,
  FaUsers,
  FaHashtag,
  FaMicrophone,
  FaCircle
} from 'react-icons/fa';
import { AuthModal } from './components/AuthModal';
import { supabase } from './supabaseClient';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToDownload = () => {
    const section = document.getElementById('download');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" position="relative" overflow="hidden">

      {/* ── Background Ambient Glow ── */}
      <Box
        position="absolute"
        top="-200px"
        left="-100px"
        w="700px"
        h="700px"
        bg="radial-gradient(circle, rgba(66,153,225,0.15) 0%, transparent 70%)"
        zIndex={0}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="100px"
        right="-200px"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(159,122,234,0.12) 0%, transparent 70%)"
        zIndex={0}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="30%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(66,153,225,0.08) 0%, transparent 70%)"
        zIndex={0}
        pointerEvents="none"
      />

      {/* ── Header / Navbar ── */}
      <Box
        as="nav"
        py={4}
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        bg="rgba(23,25,35,0.8)"
        backdropFilter="blur(12px)"
        position="sticky"
        top={0}
        zIndex={20}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Heading
                size="md"
                letterSpacing="tight"
                bgGradient="linear(to-r, blue.400, purple.400)"
                bgClip="text"
                fontWeight="extrabold"
              >
                CuiCall
              </Heading>
              <Text
                fontSize="xs"
                color="gray.500"
                display={{ base: 'none', md: 'block' }}
                fontWeight="medium"
              >
                Conectando você sem intermediários
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Button
                variant="ghost"
                size="sm"
                color="gray.300"
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                display={{ base: 'none', md: 'flex' }}
              >
                Recursos
              </Button>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={scrollToDownload}
                _hover={{ transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(66,153,225,0.4)' }}
                transition="all 0.2s"
              >
                Baixar Agora
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* ── Hero Section (2 Colunas) ── */}
      <Container maxW="container.xl" pt={{ base: 16, md: 28 }} pb={{ base: 12, md: 24 }} position="relative" zIndex={1}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 12, lg: 16 }}
          align="center"
        >
          {/* Lado Esquerdo — Texto */}
          <VStack spacing={7} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }} flex={1}>
            <Badge
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              textTransform="none"
              fontWeight="semibold"
            >
              🎮 Feito para gamers e comunidades
            </Badge>

            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              lineHeight="shorter"
              fontWeight="extrabold"
            >
              O seu novo ponto de{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                encontro para jogar
              </Text>{' '}
              e conversar com amigos
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.400" maxW="xl" lineHeight="tall">
              Uma alternativa leve e P2P baseada em canais de voz e texto.
              Comunique-se diretamente, sem atrasos e sem pesar no seu PC.
            </Text>

            <HStack spacing={4} pt={2}>
              <Button
                size="lg"
                colorScheme="blue"
                onClick={scrollToDownload}
                leftIcon={<Icon as={FaWindows} />}
                _hover={{ transform: 'translateY(-2px)', boxShadow: '0 8px 30px rgba(66,153,225,0.4)' }}
                transition="all 0.2s"
              >
                Download para Windows
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="blue.400"
                color="blue.400"
                _hover={{ bg: 'whiteAlpha.100', borderColor: 'blue.300' }}
                onClick={session ? undefined : onOpen}
              >
                {session ? 'Minha Conta' : 'Criar Conta'}
              </Button>
            </HStack>

            <HStack spacing={6} pt={4}>
              <HStack spacing={2}>
                <Icon as={FaCircle} w={2} h={2} color="green.400" />
                <Text fontSize="sm" color="gray.500">100% P2P</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaCircle} w={2} h={2} color="green.400" />
                <Text fontSize="sm" color="gray.500">Open Source</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaCircle} w={2} h={2} color="green.400" />
                <Text fontSize="sm" color="gray.500">Gratuito</Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Lado Direito — Mockup do App */}
          <Box flex={1} w="full" maxW={{ lg: '520px' }} position="relative">
            {/* Glow atrás do mockup */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="110%"
              h="110%"
              bg="radial-gradient(circle, rgba(66,153,225,0.15) 0%, rgba(159,122,234,0.1) 40%, transparent 70%)"
              zIndex={-1}
              borderRadius="3xl"
            />

            <Box
              bg="gray.800"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.700"
              boxShadow="0 25px 50px -12px rgba(0,0,0,0.6), 0 0 60px rgba(66,153,225,0.1)"
              overflow="hidden"
            >
              {/* Barra de título fake */}
              <Flex
                bg="gray.900"
                px={4}
                py={3}
                align="center"
                borderBottom="1px solid"
                borderColor="gray.700"
              >
                <HStack spacing={2}>
                  <Box w={3} h={3} borderRadius="full" bg="red.400" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.400" />
                  <Box w={3} h={3} borderRadius="full" bg="green.400" />
                </HStack>
                <Text fontSize="xs" color="gray.500" ml={4} fontWeight="medium">
                  CuiCall — Meu Servidor
                </Text>
              </Flex>

              {/* Conteúdo do mockup */}
              <Flex h="300px">
                {/* Sidebar */}
                <VStack
                  w="180px"
                  bg="gray.850"
                  borderRight="1px solid"
                  borderColor="gray.700"
                  p={3}
                  spacing={1}
                  align="stretch"
                  display={{ base: 'none', md: 'flex' }}
                  sx={{ bg: 'rgba(26,32,44,0.6)' }}
                >
                  <Text fontSize="2xs" color="gray.500" fontWeight="bold" textTransform="uppercase" px={2} pt={2} pb={1}>
                    Canais de Texto
                  </Text>
                  <HStack px={2} py={1.5} borderRadius="md" bg="whiteAlpha.100" spacing={2}>
                    <Icon as={FaHashtag} w={3} h={3} color="gray.400" />
                    <Text fontSize="xs" color="white">geral</Text>
                  </HStack>
                  <HStack px={2} py={1.5} borderRadius="md" _hover={{ bg: 'whiteAlpha.50' }} spacing={2}>
                    <Icon as={FaHashtag} w={3} h={3} color="gray.500" />
                    <Text fontSize="xs" color="gray.400">gameplay</Text>
                  </HStack>
                  <HStack px={2} py={1.5} borderRadius="md" _hover={{ bg: 'whiteAlpha.50' }} spacing={2}>
                    <Icon as={FaHashtag} w={3} h={3} color="gray.500" />
                    <Text fontSize="xs" color="gray.400">memes</Text>
                  </HStack>

                  <Text fontSize="2xs" color="gray.500" fontWeight="bold" textTransform="uppercase" px={2} pt={4} pb={1}>
                    Canais de Voz
                  </Text>
                  <HStack px={2} py={1.5} borderRadius="md" bg="whiteAlpha.50" spacing={2}>
                    <Icon as={FaMicrophone} w={3} h={3} color="green.400" />
                    <Text fontSize="xs" color="green.300">Sala 1</Text>
                  </HStack>
                  <HStack px={2} py={1.5} borderRadius="md" spacing={2}>
                    <Icon as={FaMicrophone} w={3} h={3} color="gray.500" />
                    <Text fontSize="xs" color="gray.400">Sala 2</Text>
                  </HStack>
                </VStack>

                {/* Chat area */}
                <VStack flex={1} p={4} spacing={3} align="stretch" justify="flex-end">
                  <HStack align="flex-start" spacing={3}>
                    <Box w={8} h={8} borderRadius="full" bg="blue.500" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="xs" fontWeight="bold">M</Text>
                    </Box>
                    <VStack align="flex-start" spacing={0.5}>
                      <HStack spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color="blue.300">Matheus</Text>
                        <Text fontSize="2xs" color="gray.600">hoje 21:30</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.300">Bora jogar agora? Tô na Sala 1 🎮</Text>
                    </VStack>
                  </HStack>

                  <HStack align="flex-start" spacing={3}>
                    <Box w={8} h={8} borderRadius="full" bg="purple.500" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="xs" fontWeight="bold">L</Text>
                    </Box>
                    <VStack align="flex-start" spacing={0.5}>
                      <HStack spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color="purple.300">Lucas</Text>
                        <Text fontSize="2xs" color="gray.600">hoje 21:31</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.300">Já tô entrando! Compartilha a tela 🔥</Text>
                    </VStack>
                  </HStack>

                  <HStack align="flex-start" spacing={3}>
                    <Box w={8} h={8} borderRadius="full" bg="green.500" flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="xs" fontWeight="bold">A</Text>
                    </Box>
                    <VStack align="flex-start" spacing={0.5}>
                      <HStack spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color="green.300">Ana</Text>
                        <Text fontSize="2xs" color="gray.600">hoje 21:32</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.300">Qualidade tá insana, zero lag! 🚀</Text>
                    </VStack>
                  </HStack>

                  {/* Input fake */}
                  <Box
                    mt={2}
                    px={4}
                    py={2.5}
                    borderRadius="lg"
                    bg="whiteAlpha.50"
                    border="1px solid"
                    borderColor="gray.700"
                  >
                    <Text fontSize="xs" color="gray.500">Enviar mensagem em #geral...</Text>
                  </Box>
                </VStack>
              </Flex>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* ── Features Section ── */}
      <Box py={{ base: 16, md: 24 }} position="relative" zIndex={1}>
        <Container maxW="container.xl">
          <VStack spacing={14}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} fontWeight="extrabold">
                Por que escolher o{' '}
                <Text as="span" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                  CuiCall
                </Text>
                ?
              </Heading>
              <Text color="gray.400" fontSize="lg" maxW="2xl">
                Construído do zero para quem leva comunicação a sério — sem intermediários, sem lag, sem complicação.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
              {/* Feature 1 */}
              <Box
                bg="whiteAlpha.50"
                p={8}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(8px)"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-6px)',
                  borderColor: 'blue.500',
                  boxShadow: '0 20px 40px rgba(66,153,225,0.15)',
                  bg: 'whiteAlpha.100'
                }}
              >
                <Flex
                  w={12}
                  h={12}
                  borderRadius="lg"
                  bg="blue.500"
                  bgGradient="linear(to-br, blue.400, blue.600)"
                  align="center"
                  justify="center"
                  mb={5}
                  boxShadow="0 4px 15px rgba(66,153,225,0.3)"
                >
                  <Icon as={FaComments} w={5} h={5} color="white" />
                </Flex>
                <Heading size="md" mb={3} fontWeight="bold">Chamadas P2P</Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="tall">
                  Conexão direta de PC para PC usando WebRTC. Menos latência, mais qualidade na sua voz e vídeo.
                </Text>
              </Box>

              {/* Feature 2 */}
              <Box
                bg="whiteAlpha.50"
                p={8}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(8px)"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-6px)',
                  borderColor: 'purple.500',
                  boxShadow: '0 20px 40px rgba(159,122,234,0.15)',
                  bg: 'whiteAlpha.100'
                }}
              >
                <Flex
                  w={12}
                  h={12}
                  borderRadius="lg"
                  bgGradient="linear(to-br, purple.400, purple.600)"
                  align="center"
                  justify="center"
                  mb={5}
                  boxShadow="0 4px 15px rgba(159,122,234,0.3)"
                >
                  <Icon as={FaDesktop} w={5} h={5} color="white" />
                </Flex>
                <Heading size="md" mb={3} fontWeight="bold">Screen Share</Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="tall">
                  Transmita seu jogo, código ou trabalho em tempo real com latência praticamente zero.
                </Text>
              </Box>

              {/* Feature 3 */}
              <Box
                bg="whiteAlpha.50"
                p={8}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(8px)"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-6px)',
                  borderColor: 'green.500',
                  boxShadow: '0 20px 40px rgba(72,187,120,0.15)',
                  bg: 'whiteAlpha.100'
                }}
              >
                <Flex
                  w={12}
                  h={12}
                  borderRadius="lg"
                  bgGradient="linear(to-br, green.400, green.600)"
                  align="center"
                  justify="center"
                  mb={5}
                  boxShadow="0 4px 15px rgba(72,187,120,0.3)"
                >
                  <Icon as={FaUsers} w={5} h={5} color="white" />
                </Flex>
                <Heading size="md" mb={3} fontWeight="bold">Comunidades</Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="tall">
                  Crie seus próprios servidores. Divida seus amigos em canais de texto e voz organizados.
                </Text>
              </Box>

              {/* Feature 4 */}
              <Box
                bg="whiteAlpha.50"
                p={8}
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(8px)"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-6px)',
                  borderColor: 'red.400',
                  boxShadow: '0 20px 40px rgba(245,101,101,0.15)',
                  bg: 'whiteAlpha.100'
                }}
              >
                <Flex
                  w={12}
                  h={12}
                  borderRadius="lg"
                  bgGradient="linear(to-br, red.400, orange.500)"
                  align="center"
                  justify="center"
                  mb={5}
                  boxShadow="0 4px 15px rgba(245,101,101,0.3)"
                >
                  <Icon as={FaShieldAlt} w={5} h={5} color="white" />
                </Flex>
                <Heading size="md" mb={3} fontWeight="bold">Seguro e Leve</Heading>
                <Text color="gray.400" fontSize="sm" lineHeight="tall">
                  Autenticação robusta via Supabase. Um wrapper ultra leve graças ao poder do Tauri.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ── Download Section ── */}
      <Box id="download" py={{ base: 20, md: 32 }} position="relative" zIndex={1}>
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
            position="relative"
            overflow="hidden"
          >
            {/* Glow interno */}
            <Box
              position="absolute"
              top="-50px"
              left="50%"
              transform="translateX(-50%)"
              w="300px"
              h="200px"
              bg="radial-gradient(circle, rgba(66,153,225,0.2) 0%, transparent 70%)"
              pointerEvents="none"
            />

            <Icon as={FaWindows} w={16} h={16} color="blue.400" />
            <VStack spacing={3}>
              <Heading size="lg" fontWeight="extrabold">
                CuiCall para Windows (64-bit)
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Baixe agora e junte-se à revolução da comunicação P2P.
              </Text>
            </VStack>
            <Button
              as="a"
              href="#"
              size="lg"
              colorScheme="blue"
              px={10}
              py={7}
              fontSize="lg"
              fontWeight="bold"
              leftIcon={<Icon as={FaWindows} />}
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 10px 40px rgba(66,153,225,0.4)'
              }}
              transition="all 0.25s"
            >
              Baixar Instalador .exe
            </Button>
            <Text fontSize="sm" color="gray.500">
              Versão 1.0.0 • Requer Windows 10 ou superior
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ── Footer ── */}
      <Box as="footer" py={8} borderTop="1px solid" borderColor="whiteAlpha.100" textAlign="center" position="relative" zIndex={1}>
        <Text color="gray.600" fontSize="sm">
          © 2026 CuiCall. Todos os direitos reservados.
        </Text>
      </Box>

      {/* ── Auth Modal ── */}
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default App;
