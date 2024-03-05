export interface TokenResponse {
    auth: boolean;
    user: string;
}

export interface AuthState {
    loggedIn: boolean;
    username: string;
}