import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { initialMonth } from './initialMonth';
import Time from '@/helpers/Time/Time';

interface IhandleOnMomentumScrollEnd {
    event:  NativeSyntheticEvent<NativeScrollEvent>;
    widthElement: number;
    TOTAL_ELEMENT: number;
    setVisibleMonths: React.Dispatch<React.SetStateAction<string[]>>;
    previousIndex: number;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    flatListRef: React.MutableRefObject<number>;
}

const handleOnMomentumScrollEnd = ({
    event,
    widthElement,
    TOTAL_ELEMENT,
    setVisibleMonths,
    previousIndex,
    setCurrentDay,
    flatListRef
}: IhandleOnMomentumScrollEnd) => {
    const offSet = event.nativeEvent.contentOffset.x;
    const index = Math.round(offSet / widthElement);

    if(index === TOTAL_ELEMENT * 2) {
        setVisibleMonths(state => initialMonth(state[TOTAL_ELEMENT * 2], TOTAL_ELEMENT));
        previousIndex = TOTAL_ELEMENT;
        flatListRef.current++;
    } 

    if(index === 0) {
        setCurrentDay(state => Time.plusMinusMonth('minus', state));
        setVisibleMonths(state => initialMonth(state[0], TOTAL_ELEMENT));
        previousIndex = TOTAL_ELEMENT;
        flatListRef.current++;
    }
        
}