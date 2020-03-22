class HttpRequest{

    constructor(){
        this.baseURL = process.env.REACT_APP_API_URL;
        this.loginURL = process.env.REACT_APP_LOGIN_URL;
    }

    async APIGetRequest(path, auth){

        // If it is a private route...
        let reqHeaders = auth ? {
            'Authorization' : `${auth}`,
            'access-control-allow-origin' : '*'
        } : {
            'access-control-allow-origin' : '*'
        };

        let url = this.baseURL + path;

        try{
            
            return fetch(url,{
                method : 'GET',
                headers :reqHeaders
            });

        }catch(e){
            throw e;
        }
    }

    APIPostRequest(path, auth, reqBody){

        // If it is a private route...
        let reqHeaders = auth ? {
            'Authorization' : `${auth}`,
            'Content-Type': 'application/json',
            'access-control-allow-origin' : '*'
        } : {
            'Content-Type': 'application/json',
            'access-control-allow-origin' : '*'
        };

        let url = this.baseURL + path;

        try{
            
            return fetch( url, {
                method : 'POST',
                headers :reqHeaders,
                body : JSON.stringify(reqBody)
            });

        }catch(e){
            throw e;
        }
    }

    LoginAuth(reqBody){

        let reqHeaders = {
            'Content-Type': 'application/json',
            'access-control-allow-origin' : '*'
        };

        try{
            
            return fetch( this.loginURL, {
                method : 'POST',
                headers :reqHeaders,
                body : JSON.stringify(reqBody)
            });

        }catch(e){
            throw e;
        }
    }    
}

module.exports =  new HttpRequest();