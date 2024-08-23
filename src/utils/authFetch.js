import { Token } from "../api/token";

export async function authFetch(url, method, params){
    const TokenCtrl = new Token();
    const token = TokenCtrl.getToken();
    console.log(token);
    const logout = ()=>{
        TokenCtrl.removeToken();
        window.location.replace("/")
    }
    if(!token){
        logout();
    }else{
        if(TokenCtrl.hasExpired(token)){
            logout();
        }else{
            console.log(params?.headers)
            console.log(params?.body)
            const tempParams = {
                ...params,
                "method": method,
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    ...params?.headers
                },
            }
            console.log(tempParams)
            return await fetch(url, tempParams)
        }
    }
}