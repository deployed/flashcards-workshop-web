import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
  type ReactNode,
  use,
} from 'react';

export type UserContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | null>(null);

export type UserContextProviderProps = {
  children: ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState('');

  return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = use(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}
