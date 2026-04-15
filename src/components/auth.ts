/**
 * auth.ts
 *
 * Thin re-export layer kept for backward-compat with login.tsx.
 * All real logic now lives in #/api/fetchers.ts.
 */

import { login, register, changePassword } from "#/api/fetchers";
import type { LoginRequest, RegisterRequest, ChangePasswordRequest } from "#/types/auth";

export type {
    LoginRequest,
    RegisterRequest,
    ChangePasswordRequest,
} from "#/types/auth";
export {
    login,
    register,
    logout,
    changePassword,
} from "#/api/fetchers";

export const authApi = {
    login: (data: LoginRequest) => login(data),
    register: (data: RegisterRequest) => register(data),
    changePassword: (data: ChangePasswordRequest) => changePassword(data),
};
