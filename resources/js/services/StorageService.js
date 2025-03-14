import axios from 'axios';


class StorageService {
    constructor () {
        
    }

    clear () {}

    remove(key) {
        window.localStorage.removeItem(key);
    }

    add(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        const value = window.localStorage.getItem(key);

        return (value ? JSON.parse(value) : null);
    }
}
export default new StorageService();