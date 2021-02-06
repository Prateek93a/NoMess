import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export default function AuthComponent({children}) {
    const [authData, setAuthData] = useState(null);
    return (
        <AuthContext.Provider value={{authData, setAuthData}}>
            {children}
        </AuthContext.Provider>
    )
};
