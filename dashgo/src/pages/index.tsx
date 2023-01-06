import {Button, Flex, Stack} from '@chakra-ui/react'
import { Input } from '../components/Form/Input';
import {SubmitHandler, useForm} from 'react-hook-form'

interface SignInFormData{
  email: string;
  password: string;
}


export default function SignIn() {

  const {register, handleSubmit, formState} = useForm()

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
              //ref={register}
              {...register('email')}
            /> 
            <Input
              //name='password'
              type='password'
              label='Senha'
              {...register('password')}
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
