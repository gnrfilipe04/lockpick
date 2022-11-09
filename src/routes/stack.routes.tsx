import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { Home } from '../screens/Home'
import { NewPass } from '../screens/NewPass'
import { InsertName } from '../screens/InsertName'

const { Navigator, Screen, } = createNativeStackNavigator()

export function StackRoutes () {
  return (
    <Navigator
      initialRouteName='login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='login'
        component={Login}
      />
      <Screen
        name='insertName'
        component={InsertName}
      />
      <Screen
        name='home'
        component={Home}
      />
      <Screen
        name='newPass'
        component={NewPass}
      />
    </Navigator>
  )
}
