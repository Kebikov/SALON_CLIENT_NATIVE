export const startHours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export const startMinutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

/**
 * `Вернет массивы: часов и минут.`
 * @returns 
 */
export const arraysForClock = () => {

    /**
     * `Массив часов.`
     */
    const hoursArray = startHours;
    /**
     * `Массив минут.`
     */
    const minutesArray = startMinutes;

    return {
        /**
         * `Массив часов.`
         */
        hoursArray,
        /**
         * `Массив минут.`
         */
        minutesArray
    }
}



