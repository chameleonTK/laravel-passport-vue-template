import axios from 'axios';
import StorageService from './StorageService';
import api from "./API";
import VueJwtDecode from 'vue-jwt-decode'

class AuthService {
    constructor () {
        this.token = StorageService.get('access_token');
        this.user = StorageService.get('user');
    }

    login (user) {
        return api.post("auth/login", {
            "grant_type": "password",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "username": user?.username,
            "password": user?.password,
            "scope": "*"
        })
    }

    me (user) {
        return api.post("auth/me", {})   
    }

    logout () {
        return api.post("auth/logout", {});
    }

    image (path) {
        return api.get("file/"+path, {responseType: 'blob'})   
    }

    setToken(access_token, refresh_token, user) {
        const jwt = VueJwtDecode.decode(access_token);
        if (!!jwt && _.includes(jwt?.scopes || [], "superadmin")) {
            StorageService.add('role', "superadmin");    
        } else if (!!jwt && _.includes(jwt?.scopes || [], "admin")) {
            StorageService.add('role', "admin");    
        } else if (!!jwt && _.includes(jwt?.scopes || [], "branchadmin")) {
            StorageService.add('role', "branchadmin");    
        }
        
        StorageService.add('access_token', access_token);
        StorageService.add('refresh_token', refresh_token);
        StorageService.add('user', jwt?.user || user || {});
    }


    check () {
        const token = StorageService.get('access_token');
        return !! token;
    }

    isSuperAdmin () {
        const role = StorageService.get('role');
        return role=="superadmin";
    }

    removeToken () {
        // window.localStorage.clear();
        StorageService.remove('access_token');
        StorageService.remove('user');
        StorageService.remove('refresh_token');
        StorageService.remove('role');
    }

}
export default new AuthService();