export const authenticated = () => {
    return localStorage.getItem('userClockInfo');
};

export const saveAuth = (auth) => {
    localStorage.setItem('userClockInfo', JSON.stringify(auth));
};

export const deleteAuth = (auth) => {

    try{

        localStorage.removeItem('userClockInfo');

    }catch(e){
        throw e;
    }
    
};