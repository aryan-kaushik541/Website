export const storeToken=(token)=>{
    if(token){

        const {access,refresh}=token;
        localStorage.setItem("access_token",access);
        localStorage.setItem("refresh_token",refresh);
    }
}

export const getToken = () =>{
    const access_token=localStorage.getItem("access_token");
    const refresh_token=localStorage.getItem("refresh_token");
    return {access_token,refresh_token}
}

export const deleteToken = ()=>{
    const {access_token,refresh_token}=getToken()
    localStorage.removeItem("access_token",access_token)
    localStorage.removeItem("refresh_token",refresh_token)
}
