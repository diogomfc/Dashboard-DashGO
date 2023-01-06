import React from "react";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Input, HStack, Button } from '@chakra-ui/react';

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Input as InputForm } from "../../components/Form/Input"
import Link from "next/link";

export default function CreateUser(){
  return(
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <InputForm 
                name="name"
                label="Nome completo"
              />
              <InputForm
                name="email"
                type="email"
                label="E-mail"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <InputForm
                name="password"
                type="password"
                label="Senha"
              />
              <InputForm
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
              />
            </SimpleGrid>

          </VStack>

          <Flex 
          mt="8" 
          justify={["center", "flex-end"]}
          >
             <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
               <Button colorScheme="pink">Salvar</Button>
             </HStack>
          </Flex>

        </Box>
      </Flex>

    </Box>
  );
} 