import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text, VStack } from "native-base";
import { Form } from "../../components/Form";

export function NewPass(){

  return (
    <Box flex={2} bg={'primary.900'} px={'20px'} py={'50px'} >
      <VStack space={'20px'}>
        <Text color={'primary.50'} fontFamily={'Inter_900Black'} fontSize={'32px'}>Nova senha</Text>
        <Form />
      </VStack>
    </Box>
  )
}