export interface TokenResponse {
    auth: boolean;
    accessToken: string;
    refreshToken: string;
    user: string;
}

export interface AuthState {
    loggedIn: boolean;
    username: string;
}