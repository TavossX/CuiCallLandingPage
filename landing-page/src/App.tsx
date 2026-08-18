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
  Flex
} from '@chakra-ui/react';
import { FaWindows, FaVideo, FaComments, FaDesktop, FaShieldAlt } from 'react-icons/fa';

function App() {
  const scrollToDownload = () => {
    const section = document.getElementById('download');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh" fontFamily="sans-serif">
      {/* Header / Navbar */}
      <Box as="nav" py={4} borderBottom="1px solid" borderColor="gray.800" bg="gray.900" position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Heading size="md" letterSpacing="tight" color="blue.400">
                CuiCall
              </Heading>
              <Text fontSize="sm" color="gray.400" display={{ base: 'none', md: 'block' }}>
                Conectando você sem intermediários
              </Text>
            </HStack>
            <Button colorScheme="blue" size="sm" onClick={scrollToDownload}>
              Baixar Agora
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="container.xl" pt={{ base: 16, md: 24 }} pb={{ base: 12, md: 20 }}>
        <VStack spacing={8} align="center" textAlign="center">
          <Heading as="h1" size="2xl" maxW="4xl" lineHeight="shorter">
            O seu novo ponto de encontro para jogar e conversar com amigos
          </Heading>
          <Text fontSize="xl" color="gray.400" maxW="2xl">
            Uma alternativa leve e P2P baseada em canais de voz e texto. Comunique-se diretamente, sem atrasos e sem pesar no seu PC.
          </Text>
          <HStack spacing={4} pt={4}>
            <Button size="lg" colorScheme="blue" onClick={scrollToDownload}>
              Download para Windows
            </Button>
            <Button size="lg" variant="outline" colorScheme="gray" color="white" _hover={{ bg: 'gray.800' }}>
              Criar Conta
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Box bg="gray.900" py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center">
              Por que escolher o CuiCall?
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {/* Feature 1 */}
              <Box bg="gray.800" p={8} borderRadius="xl" boxShadow="xl" transition="transform 0.2s" _hover={{ transform: 'translateY(-5px)' }}>
                <Icon as={FaComments} w={10} h={10} color="blue.400" mb={4} />
                <Heading size="md" mb={3}>Chamadas P2P de Alta Qualidade</Heading>
                <Text color="gray.400">Conexão direta de PC para PC usando WebRTC. Menos latência, mais qualidade na sua voz e vídeo.</Text>
              </Box>

              {/* Feature 2 */}
              <Box bg="gray.800" p={8} borderRadius="xl" boxShadow="xl" transition="transform 0.2s" _hover={{ transform: 'translateY(-5px)' }}>
                <Icon as={FaDesktop} w={10} h={10} color="purple.400" mb={4} />
                <Heading size="md" mb={3}>Compartilhamento de Tela</Heading>
                <Text color="gray.400">Transmita seu jogo, código ou trabalho em tempo real com latência praticamente zero.</Text>
              </Box>

              {/* Feature 3 */}
              <Box bg="gray.800" p={8} borderRadius="xl" boxShadow="xl" transition="transform 0.2s" _hover={{ transform: 'translateY(-5px)' }}>
                <Icon as={FaVideo} w={10} h={10} color="green.400" mb={4} />
                <Heading size="md" mb={3}>Comunidades Estilo Discord</Heading>
                <Text color="gray.400">Crie seus próprios servidores. Divida seus amigos em canais de texto e voz organizados.</Text>
              </Box>

              {/* Feature 4 */}
              <Box bg="gray.800" p={8} borderRadius="xl" boxShadow="xl" transition="transform 0.2s" _hover={{ transform: 'translateY(-5px)' }}>
                <Icon as={FaShieldAlt} w={10} h={10} color="red.400" mb={4} />
                <Heading size="md" mb={3}>Segurança e Leveza</Heading>
                <Text color="gray.400">Autenticação robusta via Supabase. Tudo isso em um wrapper ultra leve graças ao poder do Tauri.</Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Download Section */}
      <Box id="download" py={{ base: 20, md: 32 }} bg="gray.900" borderTop="1px solid" borderColor="gray.800">
        <Container maxW="container.md">
          <VStack spacing={8} bg="gray.800" p={12} borderRadius="2xl" textAlign="center" boxShadow="2xl">
            <Icon as={FaWindows} w={16} h={16} color="blue.400" />
            <VStack spacing={3}>
              <Heading size="lg">CuiCall para Windows (64-bit)</Heading>
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
              py={8}
              fontSize="xl"
              leftIcon={<Icon as={FaWindows} />}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Baixar Instalador .exe
            </Button>
            <Text fontSize="sm" color="gray.500">
              Versão 1.0.0 • Requer Windows 10 ou superior
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" py={8} borderTop="1px solid" borderColor="gray.800" textAlign="center">
        <Text color="gray.500">© 2026 CuiCall. Todos os direitos reservados.</Text>
      </Box>
    </Box>
  );
}

export default App;
