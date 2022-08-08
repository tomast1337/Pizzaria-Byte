export const verifyToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (decoded.exp > Date.now() / 1000) {
                return true;
            }
            else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    return false;
}