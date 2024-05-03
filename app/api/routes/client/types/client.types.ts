import { TRole } from "../../registration/types/registration.types";


export interface IgetInfoBasic {
    id: number;
    email: string;
    role: TRole;
    name: string;
    picture: string | null;
    phone: string | null;
    /**
     * Активирован ли аккаунт.
     * - 1 = активирован
     * - 0 = не активирован 
     */
    isActivated: number;
}