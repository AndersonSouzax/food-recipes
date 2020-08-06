class HttpRequest{

    constructor(){
        this.baseURL = process.env.REACT_APP_API_URL;
        this.loginURL = process.env.REACT_APP_LOGIN_URL;
    }

    APIGetRequest(path, auth){

      // If it is a private route...
      let reqHeaders = auth ? { 'Authorization' : ` Token ${auth}` } : {};

      let url = this.baseURL + path;

      return fetch(url, { method : 'GET', headers :reqHeaders });

    }

    APIMultiRequest(path, auth, method, reqBody){

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
                method : method,
                headers :reqHeaders,
                body : JSON.stringify(reqBody)
            });

        }catch(e){
            throw e;
        }
    }

    loginAuth(reqBody){
            
      return fetch( this.loginURL, {
          method : 'POST',
          headers : { 'Content-Type' : 'application/json' },
          body : JSON.stringify(reqBody)
      });

    }
}
export default new HttpRequest();