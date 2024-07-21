const hasUserAuthenticated  = () => {

}

const setItem = (key: string, value:string) => {
    return localStorage.setItem(key,stringify(value));
}

const getItem = (key : string) => {
    return localStorage.getItem(key);
}

const removeItem = (key : string) => {
    return localStorage.removeItem(key);
}

const stringify = (data : unknown) => {
    return JSON.stringify(data);
}

const parse = (data : string) => {
    return JSON.parse(data);
}

export { hasUserAuthenticated, setItem, getItem, stringify, removeItem, parse };

