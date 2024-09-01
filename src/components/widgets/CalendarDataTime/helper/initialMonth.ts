import Time from '@/helpers/Time/Time';

/**
* `Формирование данных для состояния отображаемых месяцев.`
* @param day Опорный день.
* @param total Количество элементов до и после опорного.
*/
export const initialMonth = (day: string, total: number): string[] => {
   const arreyMonth: string[] = [];
   for(let i = total; i > 0; i--) {
       arreyMonth.push(Time.calcMonth(i * -1, day));
   }
   for(let i = 0; i <= total; i++) {
       arreyMonth.push(Time.calcMonth(i, day));
   }
   return arreyMonth;
}