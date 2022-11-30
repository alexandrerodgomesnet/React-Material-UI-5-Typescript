export interface IAuthContextData {
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, pass: string) => Promise<string | void>;
}