import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl='/api/auth';

    constructor (
        private http: HttpClient
    ) {}
    login(username: string, password: string) {
        return this.http.post<{token: string}>(
            `${this.apiUrl}/login`,
            {username, password}
        );
    }
    saveToken(token:string) {
        return localStorage.setItem('token', token);
    }
    getToken() : string | null {
        return localStorage.getItem('token');
    }
    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}