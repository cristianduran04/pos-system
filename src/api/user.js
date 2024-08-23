import {  ENV } from "../utils/constants";
import {authFetch} from "../utils/authFetch"

export class User{
    async getMe(){
        try {
            const url = ENV.PATH+"/"+ENV.ENDPOINTS.USER.GETME;
            const method = "GET";

            const response = await authFetch(url, method);
            const result = await response.json();
            console.log("esto es userCtrl dentro del context: ", response )
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async updateMe(data,id){
        try {
            const url = ENV.PATH+"/"+ENV.ENDPOINTS.USER.UPDATEME+"/"+id;
            console.log("la url es "+url)
            const method = "PUT";
            const params = {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }    
            const response = await authFetch(url, method, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
        


    }
}