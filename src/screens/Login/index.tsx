import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, FormControl, Icon, Pressable, Text, VStack } from "native-base";
import { MyInput } from "../../components/MyInput";
import { useForm, SubmitHandler, Control  } from "react-hook-form";
import * as yup from 'yup'  
import { yupResolver } from '@hookform/resolvers/yup'

type InputProps = {
  email: string,
  password: string,
};

export function Login(){
  const { navigate } = useNavigation()
  
  const [ showPass, setShowPass ] = useState(false)

  const createUserFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  })

  const { handleSubmit, formState: { errors }, control } = useForm<InputProps>({
    resolver: yupResolver(createUserFormSchema)
  });

  const onSubmit: SubmitHandler<InputProps> = ( data:InputProps ) => console.log({data});

  return (
    <Box flex={2} bg={'primary.900'} px={'20px'} py={'50px'} >
      <VStack space={'20px'}>
        <FormControl isInvalid={Boolean(errors.email || errors.password)} isRequired justifyContent={'center'} h={"92%"}>
          <VStack space={'16px'}>
          <Text color={'primary.50'} fontFamily={'Inter_900Black'} fontSize={'32px'}>Insira seus dados para entrar</Text>
          <VStack space={'10px'}>
            <MyInput
              control={control as Control<any, any>}
              name="email"
              placeholder="E-mail"
              errorMessage={errors.email?.message}
            />

            <MyInput
              control={control}
              name={"password"}
              type={'password'}
              secureTextEntry={!showPass}
              InputRightElement={
              <Pressable onPress={() => setShowPass(!showPass)}>
                <Icon as={<MaterialCommunityIcons name={showPass ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="primary.500"/>
              </Pressable>}
              placeholder="Senha"
              errorMessage={errors.password?.message}
            />
            
          </VStack>
          <VStack mt={'10px'} space={'10px'}>
            <Button 
            bg={'secondary.400'}
            _pressed={{
              background: 'purple.700'
            }} 
            onPress={handleSubmit(onSubmit)}>Entrar</Button>
            <Button 
            _pressed={{
              background: 'gray.600'
            }}  
            bg={'primary.500'} 
            onPress={() => navigate('welcome')}>Cancelar</Button>
          </VStack>
          </VStack>
        </FormControl>
      </VStack>
    </Box>
  )
}