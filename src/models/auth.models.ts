export interface TokenResponse {
    auth: boolean;
    user: string;
    accessToken: string;
    refreshToken: string;
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