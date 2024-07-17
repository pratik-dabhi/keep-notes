const hasUserAuthenticated  = () => {

}

const setItem = (key: string, value:string) => {
    return localStorage.setItem(key,stringify(value));
}

const getItem = (key : string) => {
    return localStorage.getItem(key);
}

const stringify = (data : unknown) => {
    return JSON.stringify(data);
}

export {hasUserAuthenticated , setItem , getItem , stringify};

