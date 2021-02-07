import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // todo: move data to a secure storage
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegisterScreen from './src/views/screens/RegisterScreen';
import LandingScreen from './src/views/screens/LandingScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import OnboardingScreen from './src/views/screens/OnboardingScreen';
import CategoryScreen from './src/views/screens/CategoryScreen';
import SplashScreen from './src/views/screens/SplashScreen';
import DashboardScreen from './src/views/screens/DashboardScreen';
import {AuthContext} from './src/context/authContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

  if(isAuthenticated){
    return (
      <NavigationContainer>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <Stack.Navigator nitialRouteName='landing' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='landing' component={LandingScreen} />
            <Stack.Screen name='onboarding' component={OnboardingScreen} />
            <Stack.Screen name='category' component={CategoryScreen} />
            <Stack.Screen name='register' component={RegisterScreen} />
            <Stack.Screen name='login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <Drawer.Navigator initialRouteName='dashboard'>
        <Drawer.Screen name='dashboard' component={DashboardScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};