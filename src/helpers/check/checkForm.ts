/**
 * Проверка полей формы.
 */
export class CheckForm {

    static checkName(name: string) {
        return name.length > 2
    }
    /**
     * Проверка Email.
     * @returns 
     * - true = почта валидна.
     * - false = почта не валидна.
     */
    static checkEmail(email: string): boolean {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return emailRegex.test(email);
    }

    static checkPhone(phone: string): boolean {
        if(phone.length !== 9) {
            return false
        } 
        if(!/^[0-9]+$/.test(phone)) {
            return false
        }
        return true;
    }

    static checkPassword(password: string) {
        return password.length > 3;
    }

}