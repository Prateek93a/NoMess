import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // todo: move data to a secure storage

export const AuthContext = createContext();

export default function AuthComponent({children}) {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
    (async function (){
      const authData = await AsyncStorage.getItem('auth-data');
      if(authData){
        setAuthData(JSON.parse(authData));
      }
    })();
  }, []);

    return (
        <AuthContext.Provider value={{authData, setAuthData}}>
            {children}
        </AuthContext.Provider>
    )
};
