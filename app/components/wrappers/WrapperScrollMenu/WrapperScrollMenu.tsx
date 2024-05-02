import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { TypeRootPage } from '@/navigation/navigation.types';
import { ScrollView } from 'react-native-gesture-handler';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    page: keyof TypeRootPage;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * - BottomMenu
 * @param page Страница на которой был использован компонент.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScrollMenu: FC<IWrapper> = ({children, page}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar animated={true} barStyle={'light-content'} backgroundColor={COLOR_ROOT.MAIN_COLOR} />
                <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'handled'} >
                        {children}
                </ScrollView>
                <BottomMenu page={page} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default WrapperScrollMenu;