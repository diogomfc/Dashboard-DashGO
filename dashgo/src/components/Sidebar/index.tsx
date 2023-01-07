import React from "react";
import { Box, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react';
import SidebarNav from './SidebarNav';
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

export function Sidebar(){

  const { isOpen, onClose } = useSidebarDrawer();
  
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  
  if(isDrawerSidebar){
    return(
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader>
            <SidebarNav />
          </DrawerHeader>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    )
  }
  return(
    <Box 
    as="aside" 
    w="64" 
    mr="8"
    >
      <SidebarNav  />
  </Box>
  )
};