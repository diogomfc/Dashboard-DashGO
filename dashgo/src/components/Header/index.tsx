import React from 'react';
import { Flex, useBreakpointValue, Icon, IconButton } from '@chakra-ui/react';
import Profile from './Profile';
import Logo from './Logo';
import SearchBox from './SearchBox';
import NotificationsNav from './NotificationsNav';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export function Header(){

  const { onOpen } = useSidebarDrawer();
  
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

    {
      !isLgVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >
         
        </IconButton>
      )
    }
       
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