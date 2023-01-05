import React from "react";
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function UserList(){
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

        <Text>Users</Text>
      </Flex>
    </Box>
  );
}