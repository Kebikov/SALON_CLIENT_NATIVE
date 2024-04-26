import type { TRole } from "../../registration/types/registration.types";

export interface IAuthenticationData {
    email: string;
    password: string;
}

export interface IBaseForAuth {
    id: number;
    role: TRole;
    password: string;
}