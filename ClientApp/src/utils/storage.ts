



export function setUserData(token:string, userId:number, userType:'user'|'company') {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userType', userType);
}
export function isCompany() {
    return localStorage.getItem('userType') === 'company';
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