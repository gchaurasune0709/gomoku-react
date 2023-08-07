export default class Auth {

    isLoggedIn() {
        const ob = JSON.parse(localStorage.getItem('loginDetails'))
        if (ob === null) return false;
        if (ob['username'] !== 'admin' || ob['password'] !== 'admin') return false;
        return true;
    }
}