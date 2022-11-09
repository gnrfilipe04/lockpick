import React, { createContext, ReactNode, useContext, useState } from 'react'
import { PasswordDTO } from '../dtos/PasswordDTO';

interface PasswordsProviderProps {
    children: ReactNode;
}

interface PasswordsContext {
  passwordList: PasswordDTO[]
  addPassword: (password: PasswordDTO) => void
  removePassword: (idPassword: string) => void
}

const PasswordsContext = createContext({} as PasswordsContext)

export function PasswordsProvider ({ children, }: PasswordsProviderProps) {
  const [ passwordList, setPasswordList ] = useState<PasswordDTO[]>([])

  function addPassword(password: PasswordDTO){
    setPasswordList([...passwordList, password])
  }

  function removePassword(idPassword: string){
    const passwordsFiltered = passwordList.filter(pass => pass.id !== idPassword)
    setPasswordList(passwordsFiltered)
  }

  return (
    <PasswordsContext.Provider
      value={{
        passwordList,
        addPassword,
        removePassword
      }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export const usePasswords = () => useContext(PasswordsContext)
