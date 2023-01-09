import {Button, Flex, Stack} from '@chakra-ui/react'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input';

interface SignInFormData{
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})


export default function SignIn() {

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const {errors} = formState

  const handleSignIn:SubmitHandler<SignInFormData> = async (data) => {
     
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(data)
  }

  return (
    <Flex 
      w="100vm" 
      h="100vh" 
      align="center" 
      justify="center"
      bg="gray.900"
      >
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="gray.800"
          p="8" // 2rem = 32px
          borderRadius={8}
          flexDir="column"
          onSubmit={
            handleSubmit(
              handleSignIn as any
            )
          }
        >
          <Stack spacing="4">
            <Input 
              //name='email'
              type='email'
              label='E-mail'
              //error={errors.email}
              {...register('email')}
              _placeholder={{ color: 'yellow.300', fontSize: '14px' }}
              placeholder={errors?.email ? '⚠️  informe um e-mail válido' : ''}
              error={errors?.email && {type: 'error', message: 'Email inválido'}}
            /> 
            <Input
            //error={errors.password}
            //name='password'
            type='password'
            label='Senha'
            {...register('password')}
            _placeholder={{ color: 'yellow.300', fontSize: '14px' }}
                placeholder={errors?.password ? '⚠️  Password obrigatória' : ''}
                error={errors?.password && {type: 'error', message: 'Senha obrigatória'}}
            />
          </Stack>

          <Button 
            type='submit' 
            mt='6' 
            colorScheme='pink' 
            size='lg'
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
    </Flex>
  )
}
