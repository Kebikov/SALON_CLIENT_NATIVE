import { IcurrentDay } from "@/components/widgets/CalendarDataTime/Calendar";


interface IYearAndMonth {
    year: number;
    month: number;
}


class Time {

    /**
     * `Вернет количество дней в месяце.`
     */
    totalDaysInMohth(date: IYearAndMonth): number {
        return new Date(date.year, date.month + 1, 0).getDate();
    }

    /**
     * `Вернет на какой день недели попадает первый день в месяце, от 1(пн.) до 7(вс.).`
     */
    firstDayInMonth(date: IYearAndMonth) {
        const firstDayInMonth = new Date(date.year, date.month, 1, 14, 0, 0, 0);
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
     */
    getMonthString(name: 'short' | 'full', month: number) {
        const monthFullName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const monthShortName = ['Янв.', 'Февр.', 'Март', 'Апр.', 'Мая', 'Июня', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'];
        
        if(name === 'full') {
            return monthFullName[month];
        }

        if(name === 'short') {
            return monthShortName[month];
        }
    }

    /**
     * `Вернет обьект с interface IcurrentDay.`
     */
    getIcurrentDay(date: Date | null): IcurrentDay {

        let dateOne = null;
        if(date) {
            dateOne = new Date(date).toISOString();
        } else {
            dateOne = new Date().toISOString();
        }
        
        const dateSplitByT = dateOne.split('T')[0];
        const dateSplit = dateSplitByT.split('-');

        return {
            day: Number(dateSplit[2]),
            month: Number(dateSplit[1]) - 1,
            year: Number(dateSplit[0])
        }
    }

    /**
     * `Вернет массив для формирования месяца.`
     */
    getArrayForMonth(date: IcurrentDay): Array<null | number> {
        const totalDays = this.totalDaysInMohth(date);
        const firstDay = this.firstDayInMonth(date);
        const allDays = [];

        for(let i = 1; i < firstDay; i++) {
            allDays.push(null);
        }
    
        for(let i = 1; i <= totalDays; i++) {
            allDays.push(i);
        }
        
        return allDays;
    }
}

export default new Time();