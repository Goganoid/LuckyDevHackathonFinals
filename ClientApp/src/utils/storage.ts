



export function setUserData(token:string, userId:number) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
}

export function isLoggedIn() {
    return localStorage.getItem('token') != null;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getUserId(): number|undefined {
    let id = localStorage.getItem('userId');
    if(id)
        return parseInt(id);
    else return undefined
}