export default {
    getToken() {
        return localStorage.getItem('token');
    },
    setToken(token) {
        localStorage.setItem('token', token);
    },
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    },
    setRefreshToken(refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
    }
}
