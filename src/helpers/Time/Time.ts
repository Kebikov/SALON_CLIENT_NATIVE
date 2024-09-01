
interface IYearAndMonth {
    year: number;
    month: number;
}

interface IFullDate extends IYearAndMonth {
    day: number;
}


class Time {

    /**
     * `Вернет количество дней в месяце.`
     */
    totalDaysInMohth(date: IYearAndMonth): number {
        return new Date(date.year, date.month, 0).getDate();
    }

    /**
     * `Вернет на какой день недели попадает первый день в месяце, от 1(пн.) до 7(вс.).`
     */
    firstDayInMonth(date: IYearAndMonth) {
        const firstDayInMonth = new Date(date.year, date.month - 1, 1, 14, 0, 0, 0);
        return firstDayInMonth.getDay() === 0 ? 7 : firstDayInMonth.getDay();
    }

    /**
     * `Вернет массив имен дней недели.`
     */
    getNamesOfDaysWeek() {
        return ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'];
    }

    /**
     * `Вернет имя месяца на русском.`
     * @example 1 
     * @return 'Январь.'
     */
    getMonthString(name: 'short' | 'full', month: number) {
        const monthFullName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const monthShortName = ['Янв.', 'Февр.', 'Март', 'Апр.', 'Мая', 'Июня', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'];
        
        if(name === 'full') {
            return monthFullName[month - 1];
        }

        if(name === 'short') {
            return monthShortName[month - 1];
        }
    }

    /**
     * `Вернет настояший день.`
     * @example '2022-02-28'
     */
    getCurrentDay() {
        const date = new Date();
        date.setHours(date.getHours() +  3);
        return date.toISOString().split('T')[0];
    }

    /**
     * `Вернет первый день текушего месяца. Например сегодня '2022-02-28', вернет '2022-02-01'`
     */
    getCurrentMonth() {
        const today = this.getCurrentDay();
        return today.slice(0, 8) + '01';
    }

    /**
     * `Вернет разбитую дату на год/месяц/день.`
     * @param data '2022-02-28'
     * @return : {year: 2022, month: 2, day: 28}
     */
    splitDate(date: string): IFullDate {
        const dateSplit = date.split('-');
        return {
            year: Number(dateSplit[0]),
            month: Number(dateSplit[1]),
            day: Number(dateSplit[2])
        }
    }

    /**
     * `Вернет только дату строкой.`
     * @param data '2022-02-28T00:00:00.000Z'
     * @return '2022-02-28'
     */
    dateToOnlyDataString(date: Date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * `Вернет массив для формирования месяца.`
     */
    getArrayForMonth(date: string): Array<null | number> {
        const splitDate = this.splitDate(date);
        const totalDays = this.totalDaysInMohth({year: splitDate.year, month: splitDate.month});
        const firstDay = this.firstDayInMonth({year: splitDate.year, month: splitDate.month});
        //console.log('Day = ', date, 'firstDay = ', firstDay, 'totalDays = ', totalDays);
        const allDays = [];

        for(let i = 1; i < firstDay; i++) {
            allDays.push(null);
        }
    
        for(let i = 1; i <= totalDays; i++) {
            allDays.push(i);
        }
        return allDays;
    }

    /**
     * `Обьединение год/месяц/день в дату.`
     * @signature combineForDate({year: 2024, month: 8, day: 20})
     * @return '2024-08-20'
     */
    combineForDate(date: IFullDate): string {
        const handleDate = new Date(date.year, date.month, date.day, 14, 0, 0, 0);
        return handleDate.toISOString().split('T')[0];
    }  
    
    /**
     * `Прибавить/отнять месяц.`
     */
    plusMinusMonth(sign: 'plus' | 'minus', state: string) {
        const splitDate = this.splitDate(state);
        const date = new Date(splitDate.year, splitDate.month - 1, 1, 14, 0, 0, 0);
        date.setMonth(sign === 'plus' ? date.getMonth() + 1 : sign === 'minus' ? date.getMonth() - 1 : 0);
        return this.dateToOnlyDataString(date);
    }

    /**
     * `Прибавить/отнять месяц.`
     * @param value Сколько прибавить или отнять месяцев надо. Например: 1, -2.
     * @param state Дата от которой отнимаем/прибавляем.
     */
    calcMonth(value: number, state: string) {
        const splitDate = this.splitDate(state);
        const date = new Date(splitDate.year, splitDate.month - 1, 1, 14, 0, 0, 0);
        date.setMonth(date.getMonth() + value);
        return this.dateToOnlyDataString(date);
    }
}

export default new Time();