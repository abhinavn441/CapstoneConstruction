import { Injectable } from "@angular/core";
import { ITokenStorage } from "./interfaces/token-storage.interface";

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService implements ITokenStorage {
    private readonly TOKEN_KEY = 'token';

    saveToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
    }
}
