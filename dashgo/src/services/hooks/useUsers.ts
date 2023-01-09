import { useQuery } from 'react-query';
import { api } from '../api';
import { User } from '../mirage';


export async function getUser(){
 
    const {data} = await api.get('users')
  
    const users = data.users.map((
      user: User
    ) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    });

    return users;

}


export function useUsers(){
  return useQuery('users', getUser,
  {
    staleTime: 1000 * 5 // 5 seconds
  });

}