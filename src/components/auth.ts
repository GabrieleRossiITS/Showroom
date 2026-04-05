export interface LoginRequest {
    email: string;
    password?: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://localhost:7036/api/v1";

export const authApi = {
    login: async (data: LoginRequest) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                response.status === 401
                    ? "Credenziali non valide"
                    : "Errore durante il login",
            );
        }

        return response.json();
    },

    register: async (data: RegisterRequest) => {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Errore durante la registrazione. Forse l'email esiste già?",
            );
        }

        return response.json();
    },
};
