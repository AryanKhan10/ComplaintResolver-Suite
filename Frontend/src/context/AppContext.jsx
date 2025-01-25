import { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export default function AppContextProvider({children}){
    const [token, setToken] = useState(null)
    const value={
        token,
        setToken
    }
    return  <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
}