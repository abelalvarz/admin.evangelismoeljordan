import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"

const LOGGED_USER = "LOGGED_USER";

interface Auth {
    loggedUser: {
        token: string,
        logged: boolean,
        name: string,
        email: string,
        role: string[]
    };
    login: (value: any) => void;
    logout: () => void;
}

interface DecodedToken {
    exp: number;
}

const AuthContext = createContext<Auth | undefined>(undefined);

const initialState = {
    name: '',
    email: '',
    role: [],
    logged: false,
    token: ''
}

export const AuthProvider = ({ children }: any) => {

    const getStoredUser = () => {
        const savedUser = window.localStorage.getItem(LOGGED_USER);
        return savedUser ? JSON.parse(savedUser) : initialState;
    }

    const [loggedUser, setLoggedUser] = useState(() => getStoredUser())

    useEffect(() => {
        validateStoredUserData();
    }, [])

    const validateStoredUserData = () => {
        const loggedUser = getStoredUser()
        if (loggedUser.token) {
            if (!isValidToken(loggedUser.token)) {
                removeStoredUser()
                return;
            }
            setLoggedUser((prevData: any) => ({ ...prevData, logged: true }))
        }
    }


    const removeStoredUser = () => {
        setLoggedUser(initialState);
        window.localStorage.removeItem(LOGGED_USER);
    }

    const isValidToken = (token: string) => {
        const decode = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        if (decode.exp < currentTime) {
            return false;
        }

        return true
    }

    const login = (value: any) => {
        isValidToken(value.token)
        setLoggedUser({ ...value, logged: true })
        window.localStorage.setItem(LOGGED_USER, JSON.stringify({ ...value, logged: true }))
    }

    const logout = () => {
        removeStoredUser()
    }
    
    return (
        <AuthContext.Provider value={{ loggedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}