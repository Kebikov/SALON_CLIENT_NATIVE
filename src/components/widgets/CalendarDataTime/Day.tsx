import { View, Text, StyleSheet, Pressable, Platform, StyleProp, ViewStyle } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface IDay {
    sizeSide: number;
    handlePressDay: (item: string | null) => void;
    itemDay: string | null;
    item: number | null;
    styleDay: 'current & selected' | 'current' | 'selected' | 'just a day'; 
}


/**
 * @component 'Один день в календаре.'
 */
const Day: FC<IDay> = ({
    sizeSide,
    handlePressDay,
    itemDay,
    item,
    styleDay
}) => {

    let styleItem: StyleProp<ViewStyle>[]  = [];

    const memoDay = useMemo(() => {

        switch(styleDay) {
            case 'current & selected':
                styleItem = [styles.round, styles.border, styles.checkItem];
                break;
            case 'current':
                styleItem = [styles.round, styles.border];
                break;
            case 'selected': 
                styleItem = [styles.round, styles.checkItem];
                break;
            case 'just a day': 
                styleItem = [];
                break;
            default: 
                styleItem = [];
                break;
        }
    
        //console.log('render = ', itemDay);

        return (
            <Pressable 
                style={[styles.itemGrid]} 
                onPress={() => handlePressDay(itemDay)}
            >
                <View style={[styles.item, ...styleItem]}>
                    <Text style={[styles.dayText]} >{item}</Text>
                </View>
            </Pressable>
        );
    },[styleDay]);

    return memoDay;
};


const styles = StyleSheet.create({
    itemGrid: {
        padding: 4,
        aspectRatio: 1 / 1,
        width: `${100 / 7}%`,
        //backgroundColor: 'green',
    },
    item: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    dayText: {
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '500',
        color: 'white',
        textAlign:'center',
    },
    round: {
        borderRadius: 150,
        overflow: 'hidden',
    },
    border: {
        borderWidth: 1,
        borderColor: 'white'
    },
    checkItem: {
        backgroundColor: COLOR_ROOT.BLUE, 
    },
});

export default Day;