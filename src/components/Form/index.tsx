
import { useState } from "react";
import { FormControl, Input, VStack, Select, Button, Pressable, Icon } from "native-base";
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
    addPassword(complementFormData(data))
    navigate('home')
  }

  return (
    <FormControl isRequired justifyContent={'space-between'} h={"92%"}>
      <VStack space={'10px'}>
        <Select
          opacity={1}
          placeholder="Escolha a categoria"
          borderColor={'primary.500'} 
          bgColor={'transparent'}
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
          type={showPass ? "text" : "password"}
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
      </VStack>
      <VStack space={'10px'}>
        <Button bg={'secondary.400'} onPress={() => onSubmit(formData)}>Salvar</Button>
        <Button bg={'primary.500'} onPress={() => navigate('home')}>Cancelar</Button>
      </VStack>
    </FormControl>
  )
}