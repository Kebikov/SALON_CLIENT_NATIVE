import { View, Text, StyleSheet, StatusBar, StatusBarStyle } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    /**
     * Цвет фона статусной строки.
     */
    backgroundColor: string;
    /**
     * Стиль статусной строки.
     */
    barStyle: StatusBarStyle;
}


/**
 * @shared Обертка для страниц с SafeAreaView и StatusBar.
 * @param backgroundColor Цвет фона статусной строки.
 * @param barStyle Стиль статусной строки.
 * @example 
 * <Wrapper>
        {JSX.Element}
</Wrapper>
 * @returns {JSX.Element}
 */
const Wrapper: FC<IWrapper> = ({children, backgroundColor, barStyle}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default Wrapper;