/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/views/screens/RegisterScreen';
import LandingScreen from './src/views/screens/LandingScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import OnboardingScreen from './src/views/screens/OnboardingScreen';
import CategoryScreen from './src/views/screens/CategoryScreen';
import SplashScreen from './src/views/screens/SplashScreen';
import {AuthContext} from './src/context/authContext';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {setAuthData} = useContext(AuthContext);

  useEffect(() => {
    (async function (){
      const authData = await AsyncStorage.getItem('auth-data');
      if(authData === null){
        setAuthenticated(false);
      }else{
        setAuthData(authData);
        setAuthenticated(true);
      }
      setLoading(false);
    })();
  }, []);

  if(isLoading){
    return (<SplashScreen/>);
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#555' barStyle='light-content' />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
             <>
              <Stack.Screen name='landing' component={LandingScreen} />
              <Stack.Screen name='onboarding' component={OnboardingScreen} />
              <Stack.Screen name='category' component={CategoryScreen} />
              <Stack.Screen name='register' component={RegisterScreen} />
              <Stack.Screen name='login' component={LoginScreen} />
            </>
        ) : (
              <Stack.Screen name='dashboard' component={LandingScreen} />
        )}
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};