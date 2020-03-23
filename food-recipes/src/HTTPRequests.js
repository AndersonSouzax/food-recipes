class HttpRequest{

    constructor(){
        this.baseURL = process.env.REACT_APP_API_URL;
        this.loginURL = process.env.REACT_APP_LOGIN_URL;
    }

    async APIGetRequest(path, auth){

        // If it is a private route...
        let reqHeaders = auth ? { 'Authorization' : ` Token ${auth}` } : {};

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
            'Authorization' : `Token ${auth}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
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

    loginAuth(reqBody){

        try{
            
            return fetch( this.loginURL, {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify(reqBody)
            });

        }catch(e){
            throw e;
        }
    }    
}

module.exports =  new HttpRequest();