import React from "react";
import {Flex, Avatar, Box, Text } from '@chakra-ui/react';

interface ProfileProps{
  showProfileData?: boolean;
}

export default function Profile({showProfileData = true}: ProfileProps){
  return(
   <Flex
    align="center"
   > 
      {showProfileData && (
           <Box
           mr="4"
           textAlign="right"
         >
           <Text>Diogo Silva</Text>
           <Text color="gray.300" fontSize="small">
             diogomfc@hotmail.com
           </Text>
         </Box>
      )}

      <Avatar size="md" name="Diogo Silva" src="https://github.com/diogomfc.png" />

   </Flex>
  );
}