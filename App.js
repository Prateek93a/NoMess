/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import {QueryClient, QueryClientProvider} from 'react-query';
import {StatusBar, LogBox} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // todo: move data to a secure storage
import RegisterScreen from './src/views/screens/RegisterScreen';
import LandingScreen from './src/views/screens/LandingScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import OnboardingScreen from './src/views/screens/OnboardingScreen';
import CategoryScreen from './src/views/screens/CategoryScreen';
import SplashScreen from './src/views/screens/SplashScreen';
import DashboardScreen from './src/views/screens/DashboardScreen';
import EatScreen from './src/views/screens/EatScreen';
import LeaveScreen from './src/views/screens/LeaveScreen';
import ComplainScreen from './src/views/screens/ComplainScreen';
import BillScreen from './src/views/screens/BillScreen';
import ProfileScreen from './src/views/screens/ProfileScreen';
import ComplaintApplicationsScreen from './src/views/screens/ComplaintApplicationsScreen';
import CouponHistoryScreen from './src/views/screens/CouponHistoryScreen';
import BillHistoryScreen from './src/views/screens/BillHistoryScreen';
import {AuthContext} from './src/context/authContext';
import LeaveApplicationsScreen from './src/views/screens/LeaveApplicationsScreen';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
//LogBox.ignoreLogs(['Syntax Error'])

enableScreens();
const queryClient = new QueryClient();

const OnboardingStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const {authData, setAuthData} = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    (async function () {
      const authData = await AsyncStorage.getItem('auth-data');
      setLoading(false);
      if (authData) {
        setAuthData(JSON.parse(authData));
      }
    })();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  if (!authData) {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#FCF6D7" barStyle="dark-content" />
        <OnboardingStack.Navigator
          initialRouteName="landing"
          screenOptions={{headerShown: false}}>
          <OnboardingStack.Screen name="landing" component={LandingScreen} />
          <OnboardingStack.Screen
            name="onboarding"
            component={OnboardingScreen}
          />
          <OnboardingStack.Screen name="category" component={CategoryScreen} />
          <OnboardingStack.Screen name="register" component={RegisterScreen} />
          <OnboardingStack.Screen name="login" component={LoginScreen} />
        </OnboardingStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AuthStack.Navigator
          initialRouteName="dashboard"
          screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="dashboard" component={DashboardScreen} />
          <AuthStack.Screen name="eat" component={EatScreen} />
          <AuthStack.Screen name="leave" component={LeaveScreen} />
          <AuthStack.Screen name="complain" component={ComplainScreen} />
          <AuthStack.Screen name="bill" component={BillScreen} />
          <AuthStack.Screen name="profile" component={ProfileScreen} />
          <AuthStack.Screen
            name="complaint-list"
            component={ComplaintApplicationsScreen}
          />
          <AuthStack.Screen
            name="leave-list"
            component={LeaveApplicationsScreen}
          />
          <AuthStack.Screen
            name="coupon-history"
            component={CouponHistoryScreen}
          />
          <AuthStack.Screen name="bill-history" component={BillHistoryScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
