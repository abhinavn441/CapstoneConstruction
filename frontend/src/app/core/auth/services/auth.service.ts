import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "../../services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = '/api/auth';

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorageService
    ) {}

    login(username: string, password: string) {
        return this.http.post<{token: string}>(
            `${this.apiUrl}/login`,
            {username, password}
        );
    }

    saveToken(token: string): void {
        this.tokenStorage.saveToken(token);
    }

    getToken(): string | null {
        return this.tokenStorage.getToken();
    }

    logout(): void {
        this.tokenStorage.removeToken();
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}