/**
 * auth.ts
 *
 * Thin re-export layer kept for backward-compat with login.tsx.
 * All real logic now lives in #/api/fetchers.ts.
 */
// Legacy authApi shape used by login.tsx
import { login, register } from "#/api/fetchers";
import type { LoginRequest, RegisterRequest } from "#/api/fetchers";

export type {
    LoginRequest,
    RegisterRequest,
    ChangePasswordRequest,
} from "#/api/fetchers";
export {
    login,
    register,
    logout,
    changePassword,
} from "#/api/fetchers";

export const authApi = {
    login: (data: LoginRequest) => login(data),
    register: (data: RegisterRequest) => register(data),
};
