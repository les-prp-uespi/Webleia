import Cookies from 'js-cookie';

export const USER_COOKIE_KEY = "webleia-user"

const setUser = (user) => {
    return Cookies.set(
        USER_COOKIE_KEY,
        JSON.stringify(user),
        { secure: true, expires: 1 }
    );
}

const getUser = () => {
    const user = Cookies.get(USER_COOKIE_KEY)
    if (user) {
        return JSON.parse(user)
    }
    return null
}

const removeUser = () => {
    Object.keys(Cookies.get()).forEach(cookie => {
        Cookies.remove(cookie);
    });
}

const logout = (saveLocation = false) => {
    const currentPath = document.location.pathname + document.location.search;
    const prevUrlParam = saveLocation ? `?prevUrl=${currentPath}` : "";
    removeUser()
    window.location = "/auth/login" + prevUrlParam;
}

const AuthUtils = {
    removeUser,
    getUser,
    setUser,
    logout
}

export default AuthUtils