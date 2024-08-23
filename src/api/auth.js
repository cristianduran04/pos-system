import {ENV} from "../utils/constants";

export class auth{
    async register(data){
        try {
            const url = ENV.PATH+"/"+ENV.ENDPOINTS.AUTH.REGISTER;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            const responde = await fetch(url, params);
            const result = await responde.json();

            if(responde.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async login(data){
        try {
            const url = ENV.PATH+"/"+ENV.ENDPOINTS.AUTH.LOGIN
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
            const response = await fetch(url, params);  
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
       
    }
}