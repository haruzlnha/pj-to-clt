"use client";

import {
  Box,
  defineStyle,
  Field,
  Flex,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [pjSalary, setPjSalary] = useState("");
  const [cltSalary, setCltSalary] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState(30);
  const [showDiscountText, setShowDiscountText] = useState(false);

  useEffect(() => {
    document.title = "Conversor PJ para CLT";
  }, []);

  const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg.muted",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "fg",
      top: "-3",
      insetStart: "2",
    },
  });

  const calculateCltSalary = () => {
    const pjValue = parseFloat(pjSalary);
    if (isNaN(pjValue)) return;

    const estimatedCltSalary = pjValue - pjValue * (discountRate / 100);

    setCltSalary(
      estimatedCltSalary.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
    setShowDiscountText(true);
  };

  const handleGithubClick = () => {
    window.open("https://github.com/haruzlnha", "_blank");
  };

  const handleLinkedinClick = () => {
    window.open("https://www.linkedin.com/in/ana-sichieri/", "_blank");
  };

  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      p="100px"
      direction="column"
      gap="2rem"
    >
      <Flex
        w={{ base: "350px", lg: "400px" }}
        h={{ base: "300px", lg: "350px" }}
        bgColor="#09090B"
        borderRadius="20px"
        p="8"
        justify="center"
        align="center"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        border="1px solid #312e38"
        fontFamily="Poppins"
        direction="column"
        gap="2rem"
      >
        <Text fontWeight="800" fontSize="large">
          Conversor de PJ para CLT
        </Text>
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              className="peer"
              placeholder=""
              variant="subtle"
              value={pjSalary}
              onChange={(e) => setPjSalary(e.target.value)}
            />
            <Field.Label css={floatingStyles}>Remuneração PJ</Field.Label>
          </Box>
        </Field.Root>
        <Button colorScheme="blue" onClick={calculateCltSalary}>
          Calcular
        </Button>
        {cltSalary && <Text>Estimativa CLT: {cltSalary}</Text>}
      </Flex>
      <Flex
        w="400px"
        h="350px"
        direction="column"
        gap="2rem"
        p={{ base: "2rem", lg: "auto" }}
      >
        {showDiscountText && (
          <>
            <Text fontSize="14px" p={{ base: "1rem", lg: "auto" }}>
              O cálculo de valores considera um desconto de {discountRate}% para
              mostrar a estimativa, na sua empresa é diferente? Altere a
              porcentagem abaixo:
            </Text>
            <Input
              type="number"
              variant="subtle"
              size="xl"
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              placeholder="Porcentagem de desconto"
            />
          </>
        )}
      </Flex>
      <Flex w="100px" h="fit-content" justify="space-between" align="center">
        <Flex fontSize="30px" cursor="pointer" onClick={handleGithubClick}>
          <FaGithub />
        </Flex>
        <Flex fontSize="30px" cursor="pointer" onClick={handleLinkedinClick}>
          <FaLinkedin />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
