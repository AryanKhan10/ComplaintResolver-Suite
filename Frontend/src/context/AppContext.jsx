
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();
export default function AppContextProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserID] = useState(null)
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            setUserID(decodedToken.userId)
        }
    }, [token])

    const value = {
        token,
        setToken,
        userId
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
