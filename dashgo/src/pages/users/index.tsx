import React, { useEffect } from "react";
import { 
  Box, 
  Flex, 
  Heading, 
  SimpleGrid, 
  Text, 
  theme, 
  Button, 
  Icon, 
  Table, 
  Thead, 
  Tr, 
  Checkbox, 
  Th, 
  Tbody, 
  Td,
  useBreakpointValue,
  Spinner,
  Link
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import NextLink from "next/link";

import { useUsers } from '../../services/hooks/useUsers';

import { User } from "../../services/mirage";
import { queryClient } from "../../services/queryClient";


export default function UserList(){
  
  const [page, setPage] = React.useState(1)

  const {data, isLoading, isFetching, error} = useUsers(page)
  console.log(data)

  const isLgVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

 async function handlePrefetchUser(userId:Number, isFetching:boolean){
    await queryClient.prefetchQuery(['user', userId], async () =>{
      const response = await fetch(`http://localhost:3000/api/users/${userId}`)
      const data = await response.json

      return data
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
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
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading size="lg" fontWeight="normal">
              Usuários

              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                //as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
           
           {
              isLoading 
              ? 
                (
                <Flex justify="center">
                  <Spinner />
                </Flex>
                )
              : error 
              ?
                (
                  <Flex justify="center">
                    <Text>Falha ao obter dados dos usuários</Text>
                  </Flex>
                ) 
              : 
                (
                  <>
                  <Table 
                    colorScheme="whiteAlpha"
                    >
                      <Thead>
                        <Tr>
                          <Th px={["4","4","6"]} color="gray.300" width="8">
                            <Checkbox colorScheme="pink" />
                          </Th>
                          <Th>Usuário</Th>
                          { isLgVersion && <Th>Data de cadastro</Th>}
                          <Th width="8"></Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {data?.users.map((user: User) => {
                          return (
                            <>
                              
                              <Tr key={user.id}>
                                <Td px={["4","4","6"]}>
                                  <Checkbox colorScheme="pink" />
                                </Td>
                          
                                <Td>
                                  <Box>
                                    <Link color="purple.400" onMouseEnter={()=> handlePrefetchUser(
                                      user.id, isFetching
                                    )} >
                                    <Text fontWeight="bold">{user.name}</Text>
                                    </Link>
                                    <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                                  </Box>
                                </Td>
                                  { isLgVersion && <Td>{user.created_at}</Td>} 
                              </Tr>
                            
                            </>
                          )
                        })}
                         
                      </Tbody> 
                  </Table> 

                  <Pagination 
                    totalCountOfRegisters={data?.totalCount as number}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                  </>
                )
            }
        
          
        </Box>
      </Flex>
    </Box>
  );
}