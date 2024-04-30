import Spinner from "@/shared/Spinner/Spinner";
import { useState } from "react";

/**
 * Hook спинера загрузки.
 */
export const useHookSpinner = () => {
    const [isShowSpinner, setIsShowSpinner] = useState<boolean>(false);

    return {
        /**
         * @shared  `Спинер загрузки.`
         * @param visible Видимость элемента.
         * @example <Spinner visible={#} />
         */
        Spinner,
        /**
         * `Переменная видим ли спиннер загрузки.`
         */
        isShowSpinner,
        /**
         * `Установка видимости спинера загрузки.`
         */
        setIsShowSpinner
    }
}