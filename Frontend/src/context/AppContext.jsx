import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken?.id) {
                    setUserId(decodedToken.id);
                } else {
                    throw new Error("Invalid token: User ID not found.");
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserId(null);
            }
        } else {
            setUserId(null);
        }
    }, [token]);

    const value = {
        token,
        setToken,
        userId,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
