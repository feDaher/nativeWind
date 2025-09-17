import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import Calculator from './app/screens/Calculator';
import "./global.css";


export type RootStackParamList = {
  Home: undefined;
  Calculator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Tela Inicial' }} 
        />
        <Stack.Screen 
          name="Calculator" 
          component={Calculator} 
          options={{ title: 'Calculadora' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
