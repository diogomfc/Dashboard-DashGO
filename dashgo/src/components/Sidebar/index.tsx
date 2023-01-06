import React from "react";
import { Flex, Stack, Box, Link, Icon, Text} from '@chakra-ui/react';
import { RiGitMergeLine, RiInputMethodLine,RiContactsLine,RiDashboardLine } from "react-icons/ri";
import NavSection from './NavSection';
import NavLink from './NavLink';

export default function Sidebar(){
  return(
    <Box 
    as="aside" 
    w="64" 
    mr="8"
    >
      <Stack 
      spacing="12" 
      align="flex-start"
      >
        <Box>
          <NavSection title="GERAL">
            <NavLink icon={RiDashboardLine}> Dashboard </NavLink>
            <NavLink icon={RiContactsLine}> Usuários </NavLink>
          </NavSection>
        </Box>
        <Box>
          <NavSection title="AUTOMAÇÃO">
            <NavLink icon={RiInputMethodLine}> Formulários </NavLink>
            <NavLink icon={RiGitMergeLine}> Automação </NavLink>
          </NavSection>
        </Box>
      </Stack>
  </Box>
  )
};