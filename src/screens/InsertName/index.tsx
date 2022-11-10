import React, { useState } from 'react'
import { Button, Center, FormControl, Input, Stack, Text, VStack, WarningOutlineIcon } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export function InsertName(){
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ name, setName ] = useState('')
  const { navigate, goBack } = useNavigation()

  const onChangeText = (value: string) => {
    if(value.includes(' ')){
      return setErrorMessage('Não pode conter espaços')
    }

    if(value.length > 10){
      return setErrorMessage('Não pode ser maior que 10 caracteres')
    }

    setErrorMessage('')
    setName(value)
  }

  async function onSubmit(){

    if(!name){
      return setErrorMessage('Nome está vazio')
    }

    await AsyncStorage.setItem('@lockpick_username', name)
    await AsyncStorage.setItem('@lockpick_userLogged', name)
    navigate('home')
  }

  return (
    <Center flex={1} bg={'primary.900'}>
      <VStack space={'10px'}>
        <Text color={'primary.50'} fontFamily={'Inter_900Black'} fontSize={'32px'}>Insira seu apelido</Text> 
        <FormControl  isInvalid={Boolean(errorMessage)}>
          <Stack>
            <Input
              borderColor={'primary.500'}
              selectionColor={'secondary.400'}  
              bgColor={'transparent'}
              placeholderTextColor={'primary.500'} 
              w={"110%"} 
              type="text"
              fontFamily={'Inter_400Regular'}
              fontSize={'16px'} 
              placeholder="Apelido aqui"
              _focus={{
                placeholderTextColor: 'primary.50',
                borderColor: 'secondary.400'
              }}  
              value={name} 
              onChangeText={onChangeText}/>
            <FormControl.HelperText>
              Digite seu apelido no máximo 10 caracteres.
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errorMessage}
            </FormControl.ErrorMessage>
          </Stack>
          <VStack space={'10px'} mt={'20px'}>
            <Button bg={'secondary.400'} disabled={Boolean(errorMessage)} opacity={errorMessage ? 0.4 : 1} w={'110%'} onPress={onSubmit}>Avançar</Button>
            <Button bg={'primary.500'} w={'110%'} onPress={() => goBack()}>Voltar</Button>
          </VStack>
        </FormControl>
      </VStack>
      
    </Center>
  )
}