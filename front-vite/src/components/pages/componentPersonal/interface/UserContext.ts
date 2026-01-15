import  { createContext, useContext } from 'react';
import type { UserInfo } from '../../../../utils/interface.ts';

export const UserContext = createContext<UserInfo | null>(null);

export const useUser = () => useContext(UserContext);