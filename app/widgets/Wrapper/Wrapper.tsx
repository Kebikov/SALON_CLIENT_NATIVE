import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IWrapper {
    children: JSX.Element | JSX.Element[];
}

/**
 * Обертка для страниц с SafeAreaView.
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
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default Wrapper;