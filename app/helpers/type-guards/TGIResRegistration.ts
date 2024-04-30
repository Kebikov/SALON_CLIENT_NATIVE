import { IResRegistration } from "@/axios/routes/registration/types/registration.types"

/**
 * `Type Guards for IResRegistration`
 * @returns
 * - true = Тип подтвержден.
 * - false = Тип не подтвержден .
 */
export const TGIResRegistration = (data: unknown): data is IResRegistration => {
    if(data && typeof data === 'object' && "id" in data && "accessToken" in data && 'refreshToken' in data && 'expiresIn' in data) {
        return true;
    } else {
        return false;
    }
};