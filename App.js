/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/views/screens/RegisterScreen';
import LandingScreen from './src/views/screens/LandingScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import OnboardingScreen from './src/views/screens/OnboardingScreen';
import CategoryScreen from './src/views/screens/CategoryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <Stack.Navigator initialRouteName='landing' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='landing' component={LandingScreen} />
        <Stack.Screen name='onboarding' component={OnboardingScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='register' component={RegisterScreen} />
        <Stack.Screen name='category' component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
