
import { createContext, useState, useEffect } from "react";
import {Token} from "../api/token"
import {User} from "../api/user"

export const AuthContext = createContext();

const TokenCtrl = new Token();
const UserCtrl = new User();

export function AuthProvider(props){
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (
            async ()=>{
                const token = TokenCtrl.getToken();

                if(!token){
                    logout()
                    setLoading(false);
                    return;
                }

                if(TokenCtrl.hasExpired(token)){
                    logout()
                }else{
                    await login(token);
                }
            }
        )()
    }, []);

    const login = async (token) => {
        try {
            
            TokenCtrl.setToken(token);
            const response = await UserCtrl.getMe();
            console.log("vamos joder", response)
            setUser(response);
            setToken(token)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const logout = ()=>{
        const token = new Token();
        token.removeToken();
        setUser(null)
        return;
    }

    const data = {
        accessToken : token,
        user,
        login,
        logout,
        updateUser: null
    };

    if(loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
} 