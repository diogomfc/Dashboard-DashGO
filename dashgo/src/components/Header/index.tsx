import React from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import Profile from './Profile';
import Logo from './Logo';
import SearchBox from './SearchBox';
import NotificationsNav from './NotificationsNav';

export default function Header(){
  
  const isLgVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  
  return(
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >  
       
       <Logo />
        
      {isLgVersion && <SearchBox />}
       
       <Flex
        align="center"
        ml="auto"
       > 
        <NotificationsNav />
        <Profile  showProfileData={isLgVersion} />
      </Flex>
      
    </Flex>
  )
}