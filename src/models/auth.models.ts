export interface TokenResponse {
    auth: boolean;
    user: string;
}

export interface AuthState {
    loggedIn: boolean;
    username: string;
    isAdmin: boolean;
}

export interface User {
    id: number;
    username: string;
    isAdmin: boolean;
}