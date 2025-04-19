
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();
export default function AppContextProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserID] = useState(null)
    const [role, setRole] = useState(null)
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)

            setUserID(decodedToken.userId)
            setRole(decodedToken.accountType)
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
        }
    }, [token])

    const value = {
        token,
        setToken,
        userId,
        role
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
