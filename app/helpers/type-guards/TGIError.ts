import type { IError } from "@/axios/routes/registration/types/registration.types"


/**
 * `Type Guards for IError`
 * @returns
 * - true = Тип подтвержден.
 * - false = Тип не подтвержден .
 */
export const TGIError = (data: unknown): data is IError => {
    if(data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
        return true;
    } else {
        return false;
    }
}