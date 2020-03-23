export const authenticated = () => {
    return localStorage.getItem('userInfo');
};

export const saveAuth = (auth) => {
    localStorage.setItem('userInfo', JSON.stringify(auth));
};

export const deleteAuth = (auth) => {

    try{

        localStorage.removeItem('userInfo');

    }catch(e){
        throw e;
    }
    
};