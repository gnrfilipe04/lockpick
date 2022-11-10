import React, { useEffect, useState, useRef } from 'react'
import { Center, Text, Button, VStack, HStack, AlertDialog } from "native-base";
import { Logo } from '../../components/Logo'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePermission } from '../../hooks/usePermission';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

export function Login(){
  const { navigate } = useNavigation()
  const { getAuth, getAuthRegister } = usePermission()

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(false)
  };

  const onConfirm = () => {
    setIsOpen(false)
    startActivityAsync(ActivityAction.SECURITY_SETTINGS);
  };

  const cancelRef = useRef(null);

  const getUserName = async () => {
    return await AsyncStorage.getItem('@lockpick_username')
  }

  const getUserLogged = async () => {
    return await AsyncStorage.getItem('@lockpick_userLogged')
  }

  const getAuthMethods = async () => {
    return await getAuthRegister()
  }

  async function handleNavigation(){
    const user = await getUserName()

    const authMethod = await getAuthMethods()

    if(authMethod){
      getAuth()
        .then(async response => {
          if(response.success){
            const username = await getUserName()
            AsyncStorage.setItem('@lockpick_userLogged', username || '')
            navigate(user ? 'home' : 'insertName')
          }
        })
    }else {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    getUserLogged()
      .then(user => { user && handleNavigation() })
  }, [])

  return (
    <>
    <VStack flex={1} bg={'blueGray.900'} justifyContent={'center'}>
      <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Padrão de segurança</AlertDialog.Header>
            <AlertDialog.Body>
              Não foi possível encontrar nenhum registro de padrão de segurança.
              Adicione um registro de padrão de segurança no seu dispositivo para ter acesso ao aplicativo.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancelar
                </Button>
                <Button bgColor={'secondary.400'} onPress={onConfirm}>
                  Confirmar
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <Logo />
        <VStack>
          <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'primary.500'}>Gerencie suas senhas</Text>
          <HStack space={'8px'}>
            <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'primary.500'}>em</Text>
            <Text mt={'12px'} fontSize={20} fontFamily={'Inter_900Black'} lineHeight={20} color={'primary.50'}>um só lugar.</Text>
          </HStack>
        </VStack>
      </Center>
      <Button mt={'49px'} onPress={handleNavigation} bg={'secondary.400'} ml={'82px'} mr={'82px'} fontFamily={'Inter_400Regular'}>Entrar</Button>
    </VStack>
    </>
  )
}