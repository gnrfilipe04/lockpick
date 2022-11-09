import React, { useEffect } from 'react'
import { Center, Text, Button, VStack, HStack } from "native-base";
import { Logo } from '../../components/Logo'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePermission } from '../../hooks/usePermission';

export function Login(){
  const { navigate } = useNavigation()
  const { getAuth } = usePermission()

  const getUserName = async () => {
    return await AsyncStorage.getItem('@lockpick_username')
  }

  const getUserLogged = async () => {
    return await AsyncStorage.getItem('@lockpick_userLogged')
  }

  async function handleNavigation(){
    const user = await getUserName()

    getAuth()
      .then(async response => {
        if(response['success']){
          const username = await getUserName()
          AsyncStorage.setItem('@lockpick_userLogged', username || '')
          navigate(user ? 'home' : 'insertName')
        }
      })
  }

  useEffect(() => {
    getUserLogged()
      .then(user => { user && handleNavigation() })
  }, [])

  return (
    <>
    <VStack flex={1} bg={'blueGray.900'} justifyContent={'center'}>
      <Center>
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