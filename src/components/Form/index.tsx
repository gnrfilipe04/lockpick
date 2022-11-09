
import { useState } from "react";
import { FormControl, Input, VStack, Select, Button, Pressable, Icon, Text, WarningOutlineIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { usePasswords } from "../../contexts/PasswordsContext";
import { socialIcons } from "../../mock/socialIcons";
import { PasswordDTO } from "../../dtos/PasswordDTO";
import uuid from 'react-native-uuid'
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface FormDataProps {
  category: string
  description: string
  password: string
}

export function Form(){

  const { navigate } = useNavigation()
  const { addPassword } = usePasswords()
  
  const [formData, setData] = useState<FormDataProps>({} as FormDataProps);
  const [showPass, setShowPass] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const complementFormData = (data: FormDataProps) => {
    const icon = socialIcons[data.category]

    let newData: PasswordDTO = {
      ...data,
      id: uuid.v4(),
      iconColor: icon.iconColor,
      iconName: icon.iconName,
    }

    return newData
  }

  function onSubmit(data: FormDataProps){
    if(!formData.category || !formData.description || !formData.password){
      return setErrorMessage('Todos os campos são obrigatórios')
    }
    setErrorMessage('')
    addPassword(complementFormData(data))
    navigate('home')
  }

  return (
    <FormControl isInvalid={Boolean(errorMessage)} isRequired justifyContent={'center'} h={"92%"}>
      <VStack space={'16px'}>
      <Text color={'primary.50'} fontFamily={'Inter_900Black'} fontSize={'32px'}>Nova senha</Text>
      <VStack space={'10px'}>
        <Select
          opacity={1}
          placeholder="Escolha a categoria"
          borderColor={'primary.500'} 
          bgColor={'transparent'}
          fontFamily={'Inter_400Regular'}
          fontSize={'16px'} 
          placeholderTextColor={'primary.500'}
          _selectedItem={{
            placeholderTextColor: 'primary.50',
            borderColor: 'secondary.400'
          }}
          onValueChange={(value) => setData({...formData, category: value})} 
        >
          {Object.keys(socialIcons).map(iconName => (
            <Select.Item key={iconName} label={iconName} value={iconName}/>
          ))}
        </Select>
        <Input
          borderColor={'primary.500'}
          selectionColor={'secondary.400'}  
          bgColor={'transparent'}
          placeholderTextColor={'primary.500'}
          fontFamily={'Inter_400Regular'}
          fontSize={'16px'} 
          _focus={{
            placeholderTextColor: 'primary.50',
            borderColor: 'secondary.400'
          }} 
          placeholder="Descrição"
          value={formData.description}
          onChangeText={(value) => setData({...formData, description: value})}
        />
        <Input 
          borderColor={'primary.500'}
          selectionColor={'secondary.400'}  
          bgColor={'transparent'}
          placeholderTextColor={'primary.500'}
          fontFamily={'Inter_400Regular'}
          fontSize={'16px'} 
          type={'password'}
          secureTextEntry={!showPass}
          InputRightElement={
          <Pressable onPress={() => setShowPass(!showPass)}>
            <Icon as={<MaterialCommunityIcons name={showPass ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="primary.500"/>
          </Pressable>}
          _focus={{
            placeholderTextColor: 'primary.50',
            borderColor: 'secondary.400'
          }} 
          placeholder="Senha"
          onChangeText={(value) => setData({...formData, password: value})}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </VStack>
      <VStack mt={'10px'} space={'10px'}>
        <Button bg={'secondary.400'} onPress={() => onSubmit(formData)}>Salvar</Button>
        <Button bg={'primary.500'} onPress={() => navigate('home')}>Cancelar</Button>
      </VStack>
      </VStack>
    </FormControl>
  )
}