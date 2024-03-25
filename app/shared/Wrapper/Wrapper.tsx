import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
}


/**
 * @shared Обертка для страниц с SafeAreaView и StatusBar.
 * @example 
 * <Wrapper>
        {JSX.Element}
</Wrapper>
 * @returns {JSX.Element}
 */
const Wrapper: FC<IWrapper> = ({children}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar animated={true} barStyle={'light-content'} backgroundColor={COLOR_ROOT.MAIN_COLOR} />
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default Wrapper;