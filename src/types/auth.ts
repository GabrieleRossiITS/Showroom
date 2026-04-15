export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChangePasswordRequest {
    email: string;
    oldPassword: string;
    newPassword: string;
}