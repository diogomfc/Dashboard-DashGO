import React from "react";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Text, HStack, Button } from '@chakra-ui/react';
import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation} from "react-query";

import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import { Input as InputForm } from "../../components/Form/Input"
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";




interface SignInFormData{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')     
  ], 'As senhas precisam ser iguais')
})


export default function CreateUser(){

   const router = useRouter();

   const createUser = useMutation(async (user:SignInFormData ) => {
    const response = await api.post( 'users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })
    return response.data.user;
  },{
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })

  const {errors} = formState

  const handleCreateUser: SubmitHandler<SignInFormData> = async (values) => {
    await createUser.mutateAsync(values);
    router.push('/users')
  }

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
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser as any)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <InputForm 
                //name="name"
                label="Nome completo"
                {...register('name')}
                _placeholder={{ color: 'yellow.300', fontSize: '14px' }}
                placeholder={errors?.name ? '⚠️  informa seu nome completo':''}
                  error= { 
                    errors?.name &&
                    {type: 'error', message: 'Nome obrigatório'}
                  }
              />
             
             <Box>
             <InputForm
                //name="email"
                type="email"
                label="E-mail"
                {...register('email')}
                _placeholder={{ color: 'yellow.300', fontSize: '14px' }}
                placeholder={errors?.email ? '⚠️  informe um e-mail válido' : ''}
                error={errors?.email && {type: 'error', message: 'Email inválido'}}
              />
              {/* {errors?.email && <p style={{color: 'red'}}>E-mail inválido</p>} */}
             </Box>
              
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <InputForm
                //name="password"
                type="password"
                label="Senha"
                {...register('password')}
                _placeholder={{ color: 'yellow.300', fontSize: '14px' }}
                placeholder={errors?.password ? '⚠️  Password obrigatória' : ''}
                error={errors?.password && {type: 'error', message: 'Senha obrigatória'}}
              />
              
              <Box>
              <InputForm
                //name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register('password_confirmation')}
              />
              {errors?.password_confirmation && <Text style={{color: 'red', fontSize:'14px'}}>Senha não confere</Text>}
              </Box>
           
            </SimpleGrid>

          </VStack>

          <Flex 
          mt="8" 
          justify={["center", "flex-end"]}
          >
             <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button 
                  //as="a" 
                  colorScheme="whiteAlpha"
                  >Cancelar</Button>
                </Link>
               <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
                >Salvar</Button>
             </HStack>
          </Flex>

        </Box>
      </Flex>

    </Box>
  );
} 