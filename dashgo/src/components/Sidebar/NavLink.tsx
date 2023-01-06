import React from "react"
import { Stack, Link, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { RiDashboardLine, RiContactsLine } from 'react-icons/ri';

interface NavLinkProps extends ChakraLinkProps{
  icon: React.ElementType;
  children: string;
}

export default function NavLink({icon, children, ...rest}: NavLinkProps){
  return(
    <Link display="flex" alignItems="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  )
}