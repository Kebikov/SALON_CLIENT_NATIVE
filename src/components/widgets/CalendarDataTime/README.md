```typescript

import { ICalendarRef } from '@/components/widgets/CalendarDataTime/Calendar';

/**
 * @param selectedDays `Массив с выбранными датами.`
 * @example ['2022-02-28', '2022-02-20']
 */
const [selectedDays, setSelectedDays] = useState<string[]>([]);
const refCalendar = useRef<ICalendarRef>(null);

const press = () => {
    // Открыть календарь.
    refCalendar.current?.openCalendar();
}

<Calendar 
    setCurrentDay={setCurrentDay} 
    currentDay={currentDay} 
    selectedDays={selectedDays}
    setSelectedDays={setSelectedDays}
    select='multi'
    ref={refCalendar} 
/>

```